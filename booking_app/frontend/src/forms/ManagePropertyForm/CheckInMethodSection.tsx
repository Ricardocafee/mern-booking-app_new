import { useEffect, useState } from "react";
import { checkInTypes } from "../../config/instructions-options-config";
import "../../effects/CheckInEffect.css";
import { renderIconByKey } from "../../components/Dictionary/DictionaryIconsCheckIn";
import { PropertyFormData } from "./ManagePropertyForm";
import { useFormContext } from "react-hook-form";

const CheckInMethodSection = () => {

    const { register, getValues } = useFormContext<PropertyFormData>();

    // State to keep track of the selected check-in method
    const [selectedMethod, setSelectedMethod] = useState(null || "");

    useEffect(() => {
        const formData = getValues();
        if (formData.checkInMethod) {
            setSelectedMethod(formData.checkInMethod);
        }
    }, [getValues]);



    // Function to handle selection of check-in method
    const handleMethodSelection = (method: string) => {
        setSelectedMethod(method);
    };

    const renderCheckInTypeLabel = (checkInType: string) => {
        if (checkInType === "Smart lock") {
            return "Guests will use a code or an app to open a lock connected to Wi-Fi.";
        } else if (checkInType === "Numeric keypad"){
            return "Guests will use the code you provide to open an electronic lock.";
        } else if (checkInType === "Safety deposit box"){
            return "Guests will use a code provided by you to open a small safe with a previous key.";
        } else if (checkInType === "Building staff"){
            return "There is someone available 24 hours a day to welcome guests.";
        } else if (checkInType === "Personal greetings"){
            return "Guests will meet you or the host to collect the keys.";
        }  else {
            return checkInType;
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-3">Check-in method</h2>
            <div className="grid grid-cols-2 gap-2">
                {/* Render options from the first column */}
                {checkInTypes.map((method, index) => (
                    <label
                        htmlFor={method}
                        key={index}
                        className={`option ${
                            selectedMethod === method ? "selected" : ""
                        } p-4 cursor-pointer`} 
                        onClick={() => handleMethodSelection(method)}
                    >
                        <input
                            type="radio"
                            id={method}
                            value={method}
                            checked={selectedMethod === method}
                             {...register("checkInMethod", { required: "This field is required"})}
                        />
                        {/* Display icon */}
                        {/* Display label */}
                        <div className="flex items-center">
                        {renderIconByKey(method)}
                        <label className="font-semibold">
                        
                            {method}
                        </label>
                        </div>
                        <div className="mt-4 border-b border-gray-300">
                        </div>
                        <div className="mt-3 text-gray-700">
                        {renderCheckInTypeLabel(method)}
                        </div>
                    </label>
                ))}
            </div>
        </>
    );
};

export default CheckInMethodSection;
