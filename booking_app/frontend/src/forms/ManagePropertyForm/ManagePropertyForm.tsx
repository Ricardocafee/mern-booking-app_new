import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImagesSection";
import StateSection from "./StateSection";
import { PropertyType } from "../../../../backend/src/shared/types";
import { useEffect, useState } from "react";
import MapSection from "./MapSection";
import RoomsSection from "./RoomsSection";
import  "../../effects/SelectionButtons.css"
import TimesSection from "./TimesSection";
import HowtoArriveSection from "./HowtoArrive";
import CheckInMethodSection from "./CheckInMethodSection";
import WifiSection from "./WifiSection";
import HouseManualSection from "./HouseManualSection";
import RulesSection from "./RulesSection";
import ImmediateBookSection from "./ImmediateBookSection";
import SecuritySection from "./SecuritySection";

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
    imageUrls: string[];
    imageFiles: FileList;
}

export type CheckIn = {
    startTime: string;
    endTime: string;
}

export type Wifi = {
    name: string;
    password: string;
}

export type BooleanSchema = {
    name: string;
    allowed: string;
}

export type securityGuestsSchema = {
    securityConditions: BooleanSchema[];
    securityDevices: BooleanSchema[];
    propertyInfo: BooleanSchema[];
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
    checkIn: CheckIn;
    checkOut: string;
    howtoArrive: string;
    checkInMethod: string;
    wifi: Wifi;
    houseManual: string;
    houseRules: BooleanSchema[];
    addedRule: string | null ;
    immediateBooking: boolean;
    noGuests: number;
    securityGuests: securityGuestsSchema;
};

type Props = {
    property?: PropertyType;
    onSave: (propertyFormData: FormData, state: string)=> void;
    isLoading: boolean; 
}

const ManagePropertyForm = ({onSave, isLoading, property}: Props) => {
    const formMethods = useForm<PropertyFormData>();
    const { handleSubmit, reset } = formMethods;
    const [ showSections, setShowSections ] = useState(true);

    useEffect(() => {
        reset(property);
    }, [property, reset]);

    const toggleSection = (section: string) => {
        if (section === 'details') {
            setShowSections(true)
        } else if( section === 'map' ) {
            setShowSections(false)
        }
    };

    


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
        formData.append("checkIn[startTime]", formDataJson.checkIn.startTime);
        formData.append("checkIn[endTime]", formDataJson.checkIn.endTime);
        formData.append("checkOut", formDataJson.checkOut);
        formData.append("howtoArrive", formDataJson.howtoArrive);
        formData.append("checkInMethod", formDataJson.checkInMethod);
        formData.append("noGuests", formDataJson.noGuests.toString());

        if (formDataJson.wifi) {
            if (formDataJson.wifi.name) {
                formData.append("wifi[name]", formDataJson.wifi.name);
            } else {
                formData.append("wifi[name]", "null");
            }
            if (formDataJson.wifi.password) {
                formData.append("wifi[password]", formDataJson.wifi.password);
            } else {
                formData.append("wifi[password]", "null");
            }
        }

        if (formDataJson.securityGuests) {
            if (formDataJson.securityGuests.securityConditions) {
                formDataJson.securityGuests.securityConditions.forEach((securityCond, index) => {
                    formData.append(`securityGuests[securityConditions][${index}][name]`, securityCond.name);
                    formData.append(`securityGuests[securityConditions][${index}][allowed]`, securityCond.allowed);
                })
            }

            if (formDataJson.securityGuests.securityDevices) {
                formDataJson.securityGuests.securityDevices.forEach((securityDev, index) => {
                    formData.append(`securityGuests[securityDevices][${index}][name]`, securityDev.name);
                    formData.append(`securityGuests[securityDevices][${index}][allowed]`, securityDev.allowed);
                })
            }

            if (formDataJson.securityGuests.propertyInfo) {
                formDataJson.securityGuests.propertyInfo.forEach((propertyInfo, index) => {
                    formData.append(`securityGuests[propertyInfo][${index}][name]`, propertyInfo.name);
                    formData.append(`securityGuests[propertyInfo][${index}][allowed]`, propertyInfo.allowed);
                })
            }
        }

        if (formDataJson.houseManual) {
            formData.append("houseManual", formDataJson.houseManual);
        } else {
            formData.append("houseManual", "null");
        }

        if (formDataJson.addedRule) {      
            formData.append("addedRule", formDataJson.addedRule);
        } else {
            formData.append("addedRule", "null");
        }

        console.log("Foem data", formDataJson)

        formData.append("immediateBooking", formDataJson.immediateBooking ? "true" : "false");


        formDataJson.houseRules.forEach((rule, index)=>{
            formData.append(`houseRules[${index}][name]`, rule.name);
            formData.append(`houseRules[${index}][allowed]`, rule.allowed);
        });


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
            formData.append(
            `roomsDetails[${index}][counter]`,
            room.counter?.toString() ?? '0'
            );
            formData.append(`roomsDetails[${index}][type]`, room.type);
            formData.append(`roomsDetails[${index}][bathroomIncluded]`, room.bathroomIncluded ? "true" : "false");
            if (room.beds) {
            room.beds.forEach((bed, idx)=>{
                formData.append(`roomsDetails[${index}][beds][${idx}][type]`, bed.type);
                formData.append(`roomsDetails[${index}][beds][${idx}][counter]`, bed.counter.toString());
            })
            }
            if (room.imageUrls) {
            room.imageUrls.forEach((image, idx)=>{
                formData.append(`roomsDetails[${index}][imageUrls][${idx}]`, image);
            })
            }

            if (formDataJson.roomsDetails[index].imageFiles) {
            }
            if (formDataJson.roomsDetails[index].imageFiles) {
                Array.from(formDataJson.roomsDetails[index].imageFiles).forEach((imageFile) => {
                    formData.append(`roomsDetails[${index}][imageFiles]`, imageFile);
                });
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

        if (formDataJson.imageFiles) {
        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile);
        });
        }

        console.log("Tesssstt", formData)

        onSave(formData, formDataJson.state);
    });
    
    return (
        <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold mb-3">Add Property</h1>
            <div className="p-2 gap-1 grid grid-cols-2 w-[300px] h-[43px] rounded-3xl items-center justify-center" style={{ backgroundColor: '#f2f2f2' }}>
                    <div 
                        className={`flex justify-center items-center text-lg font-semibold rounded-2xl ${showSections ? 'fixedEffect' : 'hoverEffect'}`} 
                        
                        onClick={() => toggleSection("details")}
                    >
                    Your space</div>
                    <div className={`flex justify-center items-center text-lg font-semibold rounded-2xl ${!showSections ? 'fixedEffect' : 'hoverEffect'}`}  onClick={() => toggleSection("map")}>Arrival guide</div>
            </div>
            { showSections && 
                <div className="section-container">
                    <DetailsSection/>
                    <StateSection/>
                    <TypeSection/>
                    <RoomsSection/>
                    <FacilitiesSection/>
                    <SecuritySection/>
                    <ImageSection/>
                    <MapSection/>
                </div>
            }
            { !showSections && 
                <div className="section-container">
                    <TimesSection/>
                    <HowtoArriveSection/>
                    <CheckInMethodSection/>
                    <WifiSection/>
                    <HouseManualSection/>
                    <RulesSection/>
                    <ImmediateBookSection/>
                </div>
            }
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