import { useFormContext } from "react-hook-form";
import TypePropertyOptions from "../../components/TypePropertyOptions";
import { checkInStartTimes, checkInEndTimes, checkOutTimes } from "../../config/time-options-config";
import { PropertyFormData } from "./ManagePropertyForm";
import { useEffect } from "react";

const TimesSection = () => {

    const { setValue, watch} = useFormContext<PropertyFormData>();
    const checkIn_start = watch("checkIn.startTime"); 
    const checkIn_end = watch("checkIn.endTime"); 
    const checkOut = watch("checkOut"); 

    useEffect(() => {
        const delay = 0; // Adjust the delay time as needed
        const timeout = setTimeout(() => {
            // Use the type values here after the delay
            // You can perform any actions here that require the type values
    
            if (!checkIn_start || checkIn_start === 'undefined') {
                // Set a default value for type.spaceType if it is still undefined
                setValue("checkIn.startTime", "13:00");
            }
        }, delay);
    
        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
    }, [checkIn_start, setValue]); // Run this effect whenever the type values or setValue function change

    useEffect(() => {
        const delay = 400; // Adjust the delay time as needed
        const timeout = setTimeout(() => {
            // Use the type values here after the delay
            // You can perform any actions here that require the type values
    
            if (!checkIn_end || checkIn_end === 'undefined') {
                // Set a default value for type.spaceType if it is still undefined
                setValue("checkIn.endTime", "11:00");
            }
        }, delay);
    
        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
    }, [checkIn_end, setValue]); // Run this effect whenever the type values or setValue function change


    const handleCheckInTimeStart = (option: string) => {
      setValue("checkIn.startTime", option)
    };

    const handleCheckInTimeEnd = (option: string) => {
      setValue("checkIn.endTime", option)
    };

    const handleCheckOut = (option: string) => {
      setValue("checkOut", option)
    };

    return (
        <>
            <>
                <div>
                    <h2 className="text-2xl font-bold mb-7">Check-in and check-out times</h2>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                            <div className="mb-2">
                                Check-in interval
                            </div>
                    </label>
                        <div className="mb-2">
                            <TypePropertyOptions options={checkInStartTimes} initialOption={checkIn_start || ''} onSelectOption={handleCheckInTimeStart} originFunction="Time_checkIn_start"/>
                        </div>
                        <TypePropertyOptions options={checkInEndTimes} initialOption={checkIn_end || ''} onSelectOption={handleCheckInTimeEnd} originFunction="Time_checkIn_end"/>
                        <div className="mt-5">
                            <label className="text-gray-700 text-sm font-bold flex-1">
                                <div className="mb-2">
                                    Check-out times
                                </div>
                            </label>
                            <TypePropertyOptions options={checkOutTimes} initialOption={checkOut || ''} onSelectOption={handleCheckOut} originFunction="Time_checkOut"/>
                        </div>
                </div>
                
            </>
        </>
    );
};

export default TimesSection;