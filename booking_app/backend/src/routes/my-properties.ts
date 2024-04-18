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
        body("street").notEmpty().withMessage('Street is required'),
        body("description").notEmpty().withMessage('Description is required'),
        body("state").notEmpty().withMessage('State of the ad is required'),
        body("neighbourhoodDescription").notEmpty().withMessage('Description of the neighbourhood is required'),
        body("transport").notEmpty().withMessage('Means of transport is required'),
        body("latitude").notEmpty().withMessage('Latitude is required'),
        body("longitude").notEmpty().withMessage('Longitude is required'),

        body("type.spaceType").notEmpty().withMessage("Space of Property is required"),
        body("type.propertyType").notEmpty().withMessage("Type of Property is required"),
        body("type.adType").notEmpty().withMessage("Type of ad is required"),
        body("type.counterFloors").notEmpty().withMessage("Number of floors is required"),
        body("type.numberFloor").notEmpty().withMessage("The number of the floor is required"),
        body("type.propertySize").notEmpty().withMessage("Size of the property is required"),

        body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage('Price per night is required and must be a number'),
        body("facilities")
        .notEmpty()
        .isArray()
        .withMessage('Facilities are required'),
        body("roomsCounter")
        .notEmpty()
        .isArray()
        .withMessage('Rooms counters are required'),
    ],
    upload.array("imageFiles", 6),
     async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newProperty: PropertyType = req.body;


            const imageUrls = await uploadImages(imageFiles);
            
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
});

router.get("/:id", verifyToken, async(req: Request, res: Response)=>{
    const id = req.params.id.toString();
    try {
        const property = await Property.findOne({
            _id: id,
            userId: req.userId,

        });
        res.json(property);
    } catch (error){
        res.status(500).json({message: "Error fetching properties"});
    }
});

router.put("/:propertyId", 
verifyToken,
upload.array("imageFiles"),
async (req: Request, res: Response) => {
    try {
        const updatedProperty: PropertyType = req.body;
        updatedProperty.lastUpdated = new Date();

        const property = await Property.findOneAndUpdate({
            _id: req.params.propertyId,
            userId: req.userId,
        }, 
        updatedProperty,
        { new: true}
        );

        if(!property) {
            return res.status(404).json({message: "Property not found" });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        property.imageUrls = [
            ...updatedImageUrls,
            ...(updatedProperty.imageUrls || []),
    ];

    await property.save();
    res.status(201).json(property);

    } catch (error) {
        res.status(500).json({ message: "Something went throw" });
    }
}
);


async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;
