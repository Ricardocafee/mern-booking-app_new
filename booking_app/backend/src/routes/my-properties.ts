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
        body("ranking").notEmpty().withMessage('Ranking is required'),
        body("state").notEmpty().withMessage('State of the ad is required'),
        body("neighbourhoodDescription").notEmpty().withMessage('Description of the neighbourhood is required'),
        body("transport").notEmpty().withMessage('Means of transport is required'),
        body("latitude").notEmpty().withMessage('Latitude is required'),
        body("longitude").notEmpty().withMessage('Longitude is required'),
        body("checkIn.startTime").notEmpty().withMessage('Start time of check-in is required'),
        body("checkIn.endTime").notEmpty().withMessage('End time of check-in is required'),
        body("checkOut").notEmpty().withMessage('Check-Out is required'),
        body("howtoArrive").notEmpty().withMessage('Description of how to arrive to the location required'),
        body("checkInMethod").notEmpty().withMessage('Check-in method required'),

        body("roomsDetails")
        .notEmpty()
        .isArray()
        .withMessage('Room details is required'),

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
    upload.any(),
     async (req: Request, res: Response) => {
        try {

            const newProperty: PropertyType = req.body;

            const files = req.files as Express.Multer.File[];   
                    

            for (const element of files) {
                console.log("Element", element);

                if (element.fieldname === 'imageFiles') {
                    const property_images = [element]; // Wrap the single file object in an array

                    const updatedImageUrls = await uploadImages(property_images);

                    newProperty.imageUrls = updatedImageUrls
                }

                    for (let index = 0; index < newProperty.roomsDetails.length; index++) {
                        if (element.fieldname === `roomsDetails[${index}][imageFiles]`) {

                            const room_images = [element]; // Wrap the single file object in an array
                            const updatedRoomImageUrls = await uploadImages(room_images);

                            newProperty.roomsDetails[index].imageUrls = updatedRoomImageUrls;                  
                        }
                    }
                }

            newProperty.lastUpdated = new Date();
            newProperty.userId = req.userId;

            const property = new Property(newProperty);
            await property.save();

            res.status(201).send(property);
        } catch (e) {
            console.log("Error creating property: ", e);
            res.status(500).json({message: "Something went wrong" });
        }
    },
    
     
);

// DELETE `/api/my-properties/:id`
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Find the property by its ID
        const property = await Property.findOne({
            _id: id,
            userId: req.userId,
        });

        // Check if property exists
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Remove the property from the database
        await Property.findByIdAndDelete(id);

        // Respond with success message
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

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
upload.any(),
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
                    

        for (const element of files) {

            if (element.fieldname === 'imageFiles') {
                const property_images = [element]; // Wrap the single file object in an array

                const updatedImageUrls = await uploadImages(property_images);

                property.imageUrls = [
                        ...updatedImageUrls,
                        ...(updatedProperty.imageUrls || []),
                ];
            }

            for (let index = 0; index < updatedProperty.roomsDetails.length; index++) {
                if (element.fieldname === `roomsDetails[${index}][imageFiles]`) {

                    const room_images = [element]; // Wrap the single file object in an array
                    const updatedRoomImageUrls = await uploadImages(room_images);

                    property.roomsDetails[index].imageUrls = [
                        ...updatedRoomImageUrls,
                        ...(updatedProperty.roomsDetails[index].imageUrls || []),
                    ];                  
                }
            }
        }

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
        console.log("res", res.url)
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;
