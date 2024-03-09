import mongoose from "mongoose";
import { PropertyType } from "../shared/types";



const propertySchema = new mongoose.Schema<PropertyType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true },
    imageUrls: [{ type: String, required: true },],
    lastUpdated: { type: Date, required: true },
});

const Property = mongoose.model<PropertyType>("Property", propertySchema)
export default Property;