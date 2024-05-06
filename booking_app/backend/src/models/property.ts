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

const bedType = new mongoose.Schema({
    type: { type: String }, 
    counter: { type: Number },
});

const roomDetails = new mongoose.Schema({
    type: { type: String }, 
    counter: { type: Number }, 
    beds: [bedType], 
    bathroomIncluded: { type: Boolean }, 
    imageUrls: [{ type: String },],
});

const Type = new mongoose.Schema({
    spaceType: {type: String, required: true},
    propertyType: {type: String, required: true},
    adType: {type: String},
    counterFloors: {type: Number},
    numberFloor: {type: Number},
    propertySize: {type: Number},
})

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

const checkInSchema = new mongoose.Schema({
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
})

const wifiSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
})

const propertySchema = new mongoose.Schema<PropertyType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    street: { type: String, required: true },
    neighbourhoodDescription: { type: String, required: true},
    transport: { type: String, required: true},
    description: { type: String, required: true },
    state: {type: String, required: true},
    ranking: {type: Number, required: true},
    type: Type,
    roomsCounter: [roomsSchema],
    roomsDetails: [roomDetails],
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [typeFacilities],
    pricePerNight: { type: Number, required: true },
    imageUrls: [{ type: String, required: true },],
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    lastUpdated: { type: Date, required: true },
    checkIn: checkInSchema,
    checkOut: { type: String, required: true },
    howtoArrive: { type: String},
    wifi: wifiSchema,
    houseManual: { type: String},
    checkInMethod: { type: String, required: true },
    bookings: [bookingSchema],
});

const Property = mongoose.model<PropertyType>("Property", propertySchema)
export default Property;