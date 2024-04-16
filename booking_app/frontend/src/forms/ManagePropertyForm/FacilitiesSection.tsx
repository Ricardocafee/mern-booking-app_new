import { useFormContext } from "react-hook-form";
import { propertyPopularFacilities, propertyBathroomFacilities, propertyBedroomLaundryFacilities, propertyEntertainmentFacilities, propertyFamilyFacilities, propertyHeatingCoolingFacilities, propertyHomeSecurityFacilities, propertyInternetOfficeFacilities, propertyKitchenFacilities, propertyLocationFeaturesFacilities, propertyOutdoorFacilities, propertyParkingFacilities, propertyServicesFacilities, facilityTypes } from "../../config/property-options-config";
import { PropertyFormData } from "./ManagePropertyForm";
import { useEffect, useState } from "react";

export type TypeFacilities = {
    type: string;
    facilities: string[];
};

interface FacilitiesMap {
    [key: string]: string[];
}

const facilitiesMap: FacilitiesMap = {
    Popular: propertyPopularFacilities,
    Bathroom: propertyBathroomFacilities,
    BedroomLaundry: propertyBedroomLaundryFacilities,
    Entertainment: propertyEntertainmentFacilities,
    Family: propertyFamilyFacilities,
    HeatingCooling: propertyHeatingCoolingFacilities,
    HomeSecurity: propertyHomeSecurityFacilities,
    InternetOffice: propertyInternetOfficeFacilities,
    Kitchen: propertyKitchenFacilities,
    LocationFeatures: propertyLocationFeaturesFacilities,
    Outdoor: propertyOutdoorFacilities,
    Parking: propertyParkingFacilities,
    Services: propertyServicesFacilities,
    // Add more mappings as needed
};

const renderFacilityTypeLabel = (facilityType: string) => {
    if (facilityType === "BedroomLaundry") {
        return "Bedroom and Laundry";
    } else if (facilityType === "HeatingCooling"){
        return "Heating and Cooling";
    } else if (facilityType === "HomeSecurity"){
        return "Home Security";
    } else if (facilityType === "InternetOffice"){
        return "Internet and Office";
    } else if (facilityType === "LocationFeatures"){
        return "Location Features";
    } else {
        return facilityType;
    }
};


const FacilitiesSection = () => {
    const { register, setValue, getValues, watch, formState: {errors}} = useFormContext<PropertyFormData>();

    // Watch for changes in the facilities field
    const facilities = watch('facilities');

    const [checkedFacilities, setCheckedFacilities] = useState<Array<Array<boolean>>>([]);

    useEffect(() => {
        console.log(getValues());
    }, [facilities]); // Run the effect whenever the facilities field changes

    useEffect(() => {
        console.log(getValues());
        // Initialize checkedFacilities state based on the values from getValues().facilities
        if (facilities) {
            const initialCheckedFacilities = facilities.map((facilityGroup: TypeFacilities) =>
                facilityGroup.facilities.map(facility => facility !== 'false' && !!facility)
            );
            setCheckedFacilities(initialCheckedFacilities);
        }
    }, [facilities]); // Run the effect whenever the facilities field changes


    const handleCheckboxChange = (facilityType:string, index: number, idx: number) => {
        const newCheckedFacilities = [...checkedFacilities];
        newCheckedFacilities[index][idx] = !checkedFacilities[index][idx];
        setValue(`facilities.${index}.type`, facilityType );
        setCheckedFacilities(newCheckedFacilities);
        console.log(getValues());
    };


    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            
           {facilityTypes.map((facilityType, index) => (
    <div key={index} className="rounded-md mb-6">
        <div className="font-bold mb-2">{renderFacilityTypeLabel(facilityType)}</div>
        <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-4 gap-3 rounded-md" style={{ border: '1px solid grey', padding: '10px' }}>
                {facilitiesMap[facilityType].map((facility, idx) => (
                        <label key={idx} className="text-sm flex gap-1 text-gray-700">
                        <input 
                        type="checkbox" 
                        value={facility} 
                        checked={checkedFacilities[index]?.[idx] || false}
                        {...register(`facilities.${index}.facilities.${idx}`)}
                        onChange={() => handleCheckboxChange(facilityType,index, idx)}
                    />
                            <div>{facility}</div>
                        </label>
                    
                ))}
                 {errors.facilities && (
                <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
            )}
                
                </div>
            </div>
        ))}
        </div>
    );
};

export default FacilitiesSection