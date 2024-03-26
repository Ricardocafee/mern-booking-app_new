import mongoose from "mongoose";
import { BookingType, PropertyType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    adultCount: {type: Number, required: true},
    childCount: {type: Number, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    userId: {type: String, required: true},
    totalCost: {type: Number, required: true},
});

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
    bookings: [bookingSchema],
});

const Property = mongoose.model<PropertyType>("Property", propertySchema)
export default Property;