import React, { useContext, useState } from "react";

type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    babyCount: number;
    petCount: number;
    propertyId: string;
    saveSearchValues:(
        destination: string, 
        checkIn: Date, 
        checkOut: Date, 
        adultCount: number, 
        childCount: number,
        babyCount: number,
        petCount: number,
        ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) =>{

    const [destination, setDestination] = useState<string>(()=> 
    sessionStorage.getItem("destination") || ""
    );
    const [checkIn, setCheckIn] = useState<Date>(()=> new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOut, setCheckOut] = useState<Date>(()=> new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const [adultCount, setAdultCount] = useState<number>(()=> parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount, setChildCount] = useState<number>(()=> parseInt(sessionStorage.getItem("childCount") || "0"));
    const [babyCount, setBabyCount] = useState<number>(()=> parseInt(sessionStorage.getItem("babyCount") || "0"));
    const [petCount, setPetCount] = useState<number>(()=> parseInt(sessionStorage.getItem("petCount") || "0"));
    const [propertyId, setPropertyId] = useState<string>(()=> sessionStorage.getItem("propertyID") || "")

    const saveSearchValues = (destination: string, 
        checkIn: Date, 
        checkOut: Date, 
        adultCount: number, 
        childCount: number,
        babyCount: number,
        petCount: number,
        propertyId?: string
        ) => {
            setDestination(destination);
            setCheckIn(checkIn);
            setCheckOut(checkOut);
            setAdultCount(adultCount);
            setChildCount(childCount);
            setBabyCount(babyCount);
            setPetCount(petCount);
            if(propertyId) {
                setPropertyId(propertyId);
            }

            sessionStorage.setItem("destination", destination);
            sessionStorage.setItem("checkIn", checkIn.toISOString());
            sessionStorage.setItem("checkOut", checkOut.toISOString());
            sessionStorage.setItem("adultCount", adultCount.toString());
            sessionStorage.setItem("childCount", childCount.toString());
            sessionStorage.setItem("babyCount", babyCount.toString());
            sessionStorage.setItem("petCount", petCount.toString());

            if(propertyId){
                sessionStorage.setItem("propertyId", propertyId)
            }
    };

    return (
        <SearchContext.Provider value={{
            destination, 
            checkIn,
            checkOut,
            adultCount,
            childCount,
            babyCount,
            petCount,
            propertyId,
            saveSearchValues,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext)
    return context as SearchContext;
};