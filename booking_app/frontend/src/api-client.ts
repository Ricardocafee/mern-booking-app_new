import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { PropertySearchResponse, PropertyType } from '../../backend/src/shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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

  export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
  };

  export const SearchProperties = async (searchParams: SearchParams
    ): Promise<PropertySearchResponse>  => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility)=> queryParams.append("facilities", facility));

    searchParams.types?.forEach((type)=> queryParams.append("types", type));

    searchParams.stars?.forEach((star)=> queryParams.append("stars", star));

    const response = await fetch(`${API_BASE_URL}/api/properties/search?${queryParams}`);

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
  }