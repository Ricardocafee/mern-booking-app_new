import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImagesSection";
import StateSection from "./StateSection";
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

export type RoomDetails = {
    type: string;
    counter: number;
    beds: BedType[];
    bathroomIncluded: boolean;
    imageUrls: string[],
}

export type PropertyFormData = {
    name: string;
    city: string;
    country: string;
    street: string;
    description: string;
    state: string;
    ranking: number;
    transport: string;
    neighbourhoodDescription: string;
    type: Type;
    roomsCounter: RoomSchema[];
    roomsDetails: RoomDetails[];
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
    onSave: (propertyFormData: FormData, state: string)=> void;
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
        formData.append("state", formDataJson.state);
        formData.append("ranking", formDataJson.ranking.toString());
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        formData.append("latitude", formDataJson.latitude.toString());
        formData.append("longitude", formDataJson.longitude.toString());

        // Type Property
        formData.append("type[spaceType]", formDataJson.type.spaceType);
        formData.append("type[propertyType]", formDataJson.type.propertyType);
        formData.append("type[adType]", formDataJson.type.adType);
        formData.append("type[counterFloors]", formDataJson.type.counterFloors.toString());
        formData.append("type[numberFloor]", formDataJson.type.numberFloor.toString());
        formData.append("type[propertySize]", formDataJson.type.propertySize.toString());

        formDataJson.facilities.forEach((facilityType, index)=>{
            formData.append(`facilities[${index}][type]`, facilityType.type);
            facilityType.facilities.forEach((facility, idx)=>{
                formData.append(`facilities[${index}][facilities][${idx}]`, facility);
            })
        });

        formDataJson.roomsDetails.forEach((room, index) => {
            console.log("room Details", room)
            formData.append(
            `roomsDetails[${index}][counter]`,
            room.counter?.toString() ?? '0'
            );
            formData.append(`roomsDetails[${index}][type]`, room.type);
            console.log("Testtttt");
            formData.append(`roomsDetails[${index}][bathroomIncluded]`, room.bathroomIncluded ? "true" : "false");
            if (room.beds) {
            room.beds.forEach((bed, idx)=>{
                formData.append(`roomsDetails[${index}][beds][${idx}][type]`, bed.type);
                formData.append(`roomsDetails[${index}][beds][${idx}][counter]`, bed.counter.toString());
            })
            }
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

        onSave(formData, formDataJson.state);
    });
    
    return (
        <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection/>
            <StateSection/>
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