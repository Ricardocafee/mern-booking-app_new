import mongoose from "mongoose";
import { BookingType, PropertyType } from "../shared/types";

const roomsSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., "Bedroom", "Bathroom", etc.
    counter: { type: Number, required: true }, // Number of rooms of this type
});

const typeFacilities = new mongoose.Schema({
    type: { type: String, required: true }, 
    facilities: [{ type: String}], 
});

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
    street: { type: String, required: true },
    neighbourhoodDescription: { type: String, required: true},
    transport: { type: String, required: true},
    description: { type: String, required: true },
    type: { type: String, required: true },
    roomsCounter: [roomsSchema],
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [typeFacilities],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true },
    imageUrls: [{ type: String, required: true },],
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    lastUpdated: { type: Date, required: true },
    bookings: [bookingSchema],
});

const Property = mongoose.model<PropertyType>("Property", propertySchema)
export default Property;