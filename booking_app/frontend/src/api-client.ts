import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { PropertySearchResponse, PropertyType, UserType, PaymentIntentResponse } from '../../backend/src/shared/types'
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if(!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json(); 
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    console.log("API_BASE_URL:", API_BASE_URL);
    throw new Error(responseBody.message);
  }
};


  export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Token invalid");
    }
  
    return response.json();
  };

  export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST"
    });

    if(!response.ok){
      throw new Error("Error during sign out");
    }
  }

  export const addMyProperty = async (PropertyFormData: FormData)=>{
    const response = await fetch (`${API_BASE_URL}/api/my-properties`, {
      method: "POST",
      credentials: "include",
      body: PropertyFormData,
    });

    if(!response.ok){
      throw new Error("Failed to add property");
    }

    return response.json();
  }

  export const fetchMyProperties = async (): Promise<PropertyType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-properties`, {
      credentials: "include"
    });

    if(!response.ok){
      throw new Error("Error fetching properties");
    }

    return response.json();
  };

  export const fetchMyPropertyById = async (propertyId: string): Promise<PropertyType>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyId}`, {
      credentials: "include"
    })
    if (!response.ok){
      throw new Error("Error fetching properties");
    }

    return response.json();
  };

  export const updateMyPropertyById = async (propertyFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyFormData.get("propertyId")}`, {
      method: "PUT",
      body: propertyFormData,
      credentials: "include",
    });

  if(!response.ok) {
    throw new Error ("Failed to update Property");
  }

  return response.json();
  };

  export type RoomSchema = {
    type: string;
    counter: number;
  };

  export type TypeFacilities = {
    type: string;
    facilities: string[];
  };

  export type Type = {
    spaceType: string;
    propertyType: string;
    adType: string;
    counterFloors: number;
    numberFloor: number;
    propertySize: number;
  }

  export type SearchParams = {
    destination?: string;
    state?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: TypeFacilities[];
    type?: Type;
    roomsCounter?: RoomSchema[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
  };

  export const SearchProperties = async (searchParams: SearchParams
    ): Promise<PropertySearchResponse>  => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("state", searchParams.state || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    queryParams.append("type.spaceType", searchParams.type?.spaceType || "");
    queryParams.append("type.propertyType", searchParams.type?.propertyType || "");
    queryParams.append("type.adType", searchParams.type?.adType || "");
    queryParams.append("type.counterFloors", searchParams.type?.counterFloors.toString() || "");
    queryParams.append("type.numberFloor", searchParams.type?.numberFloor.toString() || "");
    queryParams.append("type.propertySize", searchParams.type?.propertySize.toString() || "");

    searchParams.facilities?.forEach((facilityType) => {
      queryParams.append("facilities.type", facilityType.type);
      facilityType.facilities?.forEach((facility) => {
        queryParams.append("facilities.facility", facility);
      });
    });

    searchParams.roomsCounter?.forEach((room) => {
      queryParams.append("roomsCounter.type", room.type);
      queryParams.append("roomsCounter.counter", room.counter.toString());
    });

    searchParams.stars?.forEach((star)=> queryParams.append("stars", star));

    const response = await fetch(`${API_BASE_URL}/api/properties/search?${queryParams}`);

    if(!response.ok){
      throw new Error("Error fetching properties");
    }

    return response.json();
  };

  

  export const fetchProperties = async (): Promise<PropertyType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/properties`);

    if(!response.ok){
      throw new Error("Error fetching properties");
    }
    return response.json();
  };

  export const fetchPropertyById = async(propertyId: string): Promise<PropertyType> => {
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`)
    if(!response.ok){
      throw new Error("Error fetching Properties");
    }

    return response.json();
  };

  export const createPaymentIntent = async (propertyId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/${propertyId}/bookings/payment-intent`, 
      {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
        },
      }
    );

    if(!response.ok){
      throw new Error("Error fetching payment intent");
    }

    return response.json();
  };

  export const createRoomBooking = async(formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/properties/${formData.propertyId}/bookings`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
    );

    if(!response.ok){
      throw new Error("Error booking room");
    }
  };

  export const fetchMyBookings = async (): Promise<PropertyType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });

    if(!response.ok) {
      throw new Error("Unable to fetch bookings");
    }

    return response.json();
  };