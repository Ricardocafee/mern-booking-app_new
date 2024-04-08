export type UserType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};


export type PropertyType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    street: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    latitude: number;
    longitude: number;
    lastUpdated: Date;
    bookings: BookingType[];
};

export type BookingType = {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
};

export type PropertySearchResponse = {
    data: PropertyType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
};

export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
}