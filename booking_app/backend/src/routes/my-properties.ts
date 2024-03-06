import express, { Request, Response} from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Property from "../models/property";
import { PropertyType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB

    }
})

// api/my-properties 
router.post(
    "/", 
    verifyToken, [
        body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage('City is required'),
        body("country").notEmpty().withMessage('Country is required'),
        body("description").notEmpty().withMessage('Description is required'),
        body("type").notEmpty().withMessage('Property type is required'),
        body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage('Price per night is required and must be a number'),
        body("type")
        .notEmpty()
        .isArray()
        .withMessage('Facilities are required'),
    ],
    upload.array("imageFiles", 6),
     async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newProperty: PropertyType = req.body;


            const uploadPromises = imageFiles.map(async(image)=>{
                const b64 = Buffer.from(image.buffer).toString("base64")
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            
            newProperty.imageUrls = imageUrls;
            newProperty.lastUpdated = new Date();
            newProperty.userId = req.userId;

            const property = new Property(newProperty);
            await property.save();

            res.status(201).send(property);
        } catch (e) {
            console.log("Error creating hotel: ", e);
            res.status(500).json({message: "Something went wrong" });
        }
    }
);

router.get("/", verifyToken, async(req: Request, res:Response)=>{

    try{
        const properties = await Property.find({userId: req.userId})
        res.json(properties);

    } catch(error) {
        res.status(500).json({ message: "Error fetching properties"})
    }
})

export default router;