import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImagesSection";
import { PropertyType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import MapSection from "./MapSection";
import RoomsSection from "./RoomsSection";

export type RoomSchema = {
    type: string;
    counter: number;
};

export type TypeFacilities = {
    type: string;
    facilities: string[];
};

export type PropertyFormData = {
    name: string;
    city: string;
    country: string;
    street: string;
    description: string;
    transport: string;
    neighbourhoodDescription: string;
    type: string;
    roomsCounter: RoomSchema[];
    pricePerNight: number;
    facilities: TypeFacilities[];
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
    latitude: number;
    longitude: number;
};

type Props = {
    property?: PropertyType;
    onSave: (propertyFormData: FormData)=> void;
    isLoading: boolean; 
}

const ManagePropertyForm = ({onSave, isLoading, property}: Props) => {
    const formMethods = useForm<PropertyFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(property);
    }, [property, reset]);

    const onSubmit = handleSubmit((formDataJson: PropertyFormData)=>{
        // create new FormData object && call our API
        const formData = new FormData();
        if(property) {
            formData.append("propertyId", property._id);
        }

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("street", formDataJson.street);
        formData.append("neighbourhoodDescription", formDataJson.neighbourhoodDescription);
        formData.append("transport", formDataJson.transport);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        formData.append("latitude", formDataJson.latitude.toString());
        formData.append("longitude", formDataJson.longitude.toString());

        formDataJson.facilities.forEach((facilityType, index)=>{
            formData.append(`facilities[${index}][type]`, facilityType.type);
            facilityType.facilities.forEach((facility, idx)=>{
                formData.append(`facilities[${index}][facilities][${idx}]`, facility);
            })
        });


        formDataJson.roomsCounter.forEach((room, index) => {
            formData.append(`roomsCounter[${index}][counter]`, room.counter.toString());
            formData.append(`roomsCounter[${index}][type]`, room.type);
        });

        // []
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index)=>{
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData);
    });
    
    return (
        <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection/>
            <TypeSection/>
            <RoomsSection/>
            <FacilitiesSection/>
            <GuestsSection/>
            <ImageSection/>
            <MapSection/>
            <span className="flex justify-end">
                <button
                disabled={isLoading}
                type="submit" 
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
                    {isLoading? "Saving..." : "Save"}
                </button>
            </span>
        </form>
         </FormProvider>
    );
};

export default ManagePropertyForm;