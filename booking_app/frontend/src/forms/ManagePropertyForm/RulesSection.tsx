import { useState } from "react";
import { houseRules } from "../../config/instructions-options-config";
import { PropertyFormData } from "./ManagePropertyForm";
import { useFormContext } from "react-hook-form";
import BooleanIndicator from "../../components/BooleanIndicator";

export type booleanSchema = {
    name: string;
    allowed: string;
}

const RulesSection = () => {
    const { getValues, setValue, register, watch, formState: {errors} } = useFormContext<PropertyFormData>();

    if (watch("addedRule") === "null"){
        setValue("addedRule", "")
    }

    // State to keep track of the selected check-in method
    const [selectedRule, setSelectedRule] = useState<null | string>("empty");
    const formData = getValues();



    const handleSelectMethod = (value: string | null, name: string) => {   
    setSelectedRule(value);

    const index = formData.houseRules.findIndex(rule => rule.name === name);
    if (index !== -1) {
        if (value) {
            // Update the value of the rule if it exists and the value is not null
            setValue(`houseRules.${index}.allowed`, value);
        } else {
            // If value is null, remove the rule from the form data

            const presentRules = formData.houseRules.filter(rule => rule.name !== name)

            if (presentRules.length === 0) {
                const newRules: booleanSchema = { name: "", allowed: "" };
                setValue("houseRules", [newRules]);
            } else {
                setValue("houseRules", presentRules);
            }
        }
    } else {
        if (value) {
            // Add the new rule if it doesn't exist and the value is not null
            const length_rooms = formData.houseRules.length;
            setValue(`houseRules.${length_rooms}.allowed`, value);
            setValue(`houseRules.${length_rooms}.name`, name); 
        }
    }

    console.log("form data", formData);
};
 


    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">House rules</h2>
            <div className="grid grid-cols-2 gap-9">
                {/* Render options from the first column */}
                {houseRules.map((rule, index) => (
                    <label htmlFor={rule} key={index} className="flex items-center justify-between">
                        <div className="text-gray-800 mr-10">
                            {rule}
                        </div>
                        <BooleanIndicator selected={selectedRule} onSelect={handleSelectMethod} name={rule} booleanInd={formData.houseRules}/>

                    </label>
                ))}
            </div>
            <div className="mb-6 mt-12"></div>
            <h1 className="text-gray-800 mb-3 font-semibold">Additional rules</h1>
             <label className="text-gray-700 text-sm font-bold flex-1">
                    <textarea
                    rows={4}
                    className="border rounded w-full py-1 px-2 font-normal mb-2"
                    placeholder="Share everything you expect from guests."
                    {...register("addedRule")}
                    >
                    </textarea>
                    {errors.addedRule && (
                        <span className="text-red-500">
                            {errors.addedRule.message}
                        </span>
                    )}

            </label>
        </div>
    );
};

export default RulesSection;
