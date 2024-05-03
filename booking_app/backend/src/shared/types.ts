export type UserType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type Type = {
    spaceType: string;
    propertyType: string;
    adType: string;
    counterFloors: number;
    numberFloor: number;
    propertySize: number;
}

export type BedType = {
    type: string;
    counter: number;
}

export type RoomDetail = {
    type: string;
    counter: number;
    beds: BedType[];
    bathroomIncluded: boolean;
    imageUrls: string[];
}


export type PropertyType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    street: string;
    neighbourhoodDescription: string;
    transport: string;
    description: string;
    ranking: number;
    state: string;
    type: Type;
    roomsCounter: RoomSchema[];
    roomsDetails: RoomDetail[];
    adultCount: number;
    childCount: number;
    facilities: TypeFacilities[];
    pricePerNight: number;
    imageUrls: string[];
    latitude: number;
    longitude: number;
    lastUpdated: Date;
    bookings: BookingType[];
};

export type TypeFacilities = {
    type: string;
    facilities: string[];
};

export type RoomSchema = {
    type: string;
    counter: number;
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