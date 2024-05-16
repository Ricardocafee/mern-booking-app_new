import { useFormContext, UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import BooleanIndicator from "../../components/BooleanIndicator";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { securityConsiderations, securityDevices, propertyInfo } from "../../config/security-options-config";
import { PropertyFormData } from "./ManagePropertyForm";

export type booleanSchema = {
    name: string;
    allowed: string;
};

const handleSelectMethod = (
    formData: PropertyFormData,
    setValue: UseFormSetValue<PropertyFormData>,
    setSelected: (value: string | null) => void,
    value: string | null,
    name: string,
    field: 'securityConditions' | 'securityDevices' | 'propertyInfo'
) => {
    setSelected(value);

    try {
        const index = formData.securityGuests[field].findIndex((security: booleanSchema) => security.name === name);
        if (index !== -1) {
            if (value !== null) {
                setValue(`securityGuests.${field}.${index}.allowed`, value);
            } else {
                const updatedList = formData.securityGuests[field].filter((security: booleanSchema) => security.name !== name);

                if (updatedList.length === 0) {
                    const newEntry: booleanSchema = { name: "", allowed: "" };
                    setValue(`securityGuests.${field}`, [newEntry]);
                } else {
                    setValue(`securityGuests.${field}`, updatedList);
                }
            }
        } else {
            if (value !== null) {
                const length = formData.securityGuests[field].length;
                setValue(`securityGuests.${field}.${length}.allowed`, value);
                setValue(`securityGuests.${field}.${length}.name`, name);
            }
        }
    } catch {
        if (value !== null) {
            setValue(`securityGuests.${field}.0.allowed`, value);
            setValue(`securityGuests.${field}.0.name`, name);
        }
    }
};

const renderSecurityLabel = (securityConsideration: string) => {
    const labels: { [key: string]: string } = {
        "Not suitable for children aged 2 to 12": "This property has features that may not be safe for children.",
        "Not suitable for babies under 2 years old": "This property has features that may not be safe for babies or children of this age.",
        "Swimming pool or hot tub without a gate or lock": "Guests have access to an unprotected swimming pool or hot tub. Check local legislation for specific requirements.",
        "By the water, like a lake or river": "Guests have unrestricted access to a body of water, such as an ocean, lake, stream or marsh, directly on or next to the property.",
        "There are climbing or play structures on the property": "Guests will have access to structures such as a playground, slide, swings and climbing ropes.",
        "There are elevated areas without handrails or protection": "Guests have access to an elevated area more than 1.4 meters high, such as a balcony, roof or terrace, without handrails or other protections.",
        "There are potentially dangerous animals on the property": "Guests and their pets will be close to animals, such as horses, mountain lions or farm animals, which can cause harm."
    };
    return labels[securityConsideration] || securityConsideration;
};

const renderSecurityLabelDevices = (securityDevices: string) => {
    const labels: { [key: string]: string } = {
        "There is a security camera outside": "This property has one or more cameras outside that record or transmit video, images or audio. Guests must be informed of the existence of these cameras, even if they are switched off.",
        "There is a decibel meter in the accommodation": "This property has one or more devices that can evaluate the sound level, but do not record audio.",
        "Carbon monoxide detector installed": "This property has a device that detects and warns of carbon monoxide gas. Check your local legislation for specific requirements.",
        "Smoke detector installed": "This property has a device that detects and warns of smoke and fire. Check your local legislation for specific requirements.",
    };
    return labels[securityDevices] || securityDevices;
};

const renderSecurityLabelProperty = (propertyInfo: string) => {
    const labels: { [key: string]: string } = {
        "Guests have to climb stairs": "Guests should expect to have to go up and down stairs during their stay.",
        "There may be noise during stays": "Guests should expect to hear some noise during their stay. For example, traffic, construction or nearby businesses.",
        "There are pets on the property": "Guests can meet or interact with pets during their stay.",
        "No car park on the property": "This property does not have dedicated parking spaces for guests.",
        "The property has shared spaces": "Guests should expect to share spaces such as the kitchen, bathroom or patio with other people during their stay.",
        "Limited basic amenities": "Some of the usual basic items are not included in this property. For example, Wi-Fi, running water or an indoor shower.",
        "There are weapons on the property": "There is at least one weapon stored in this property. Check your local legislation for specific requirements.",
    };
    return labels[propertyInfo] || propertyInfo;
};

const SecuritySection = () => {
    const { getValues, setValue } = useFormContext<PropertyFormData>();
    const [selectedSafetyConsideration, setSelectedSafetyConsideration] = useState<null | string>("empty");
    const [selectedSafetyDevices, setSelectedSafetyDevices] = useState<null | string>("empty");
    const [selectedPropertyInfo, setSelectedPropertyInfo] = useState<null | string>("empty");
    const [isGridVisibleConsideration, setIsGridVisibleConsideration] = useState(false);
    const [isGridVisibleDevices, setIsGridVisibleDevices] = useState(false);
    const [isGridVisiblePropertyInfo, setIsGridVisiblePropertyInfo] = useState(false);


    const toggleGridVisibility = (setter: (value: boolean) => void, value: boolean) => {
        setter(!value);
    };

    const formData = getValues();

    const renderSecuritySection = (
        title: string,
        items: string[],
        selected: string | null,
        onSelect: (value: string | null, name: string) => void,
        isVisible: boolean,
        toggleVisibility: () => void,
        booleanInd: booleanSchema[],
        renderLabel: (item: string) => string
    ) => (
        <div className="border border-gray-400 p-4 mb-4 rounded-md mt-4">
            <div className="font-semibold flex justify-between cursor-pointer" onClick={toggleVisibility}>
                <div>{title}</div>
                <div className="ml-auto p-1">
                    {isVisible ? <FaAngleUp /> : <FaAngleDown />}
                </div>
            </div>

            {isVisible && (
                <div className="grid grid-cols-2 gap-6 mt-3">
                    {items.map((item, index) => (
                        <div key={index}>
                            <label htmlFor={item} className="flex items-center justify-between">
                                <div className="text-gray-800 mr-10">{item}</div>
                                <BooleanIndicator
                                    selected={selected}
                                    onSelect={onSelect}
                                    name={item}
                                    booleanInd={booleanInd}
                                />
                            </label>
                            <div className="text-sm text-gray-500" style={{ width: '70%' }}>
                                {renderLabel(item)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Security for guests</h2>
            <p className="text-sm text-gray-500 mb-8">The security information you share will appear in the ad along with other information, such as the house rules.</p>
            {renderSecuritySection(
                "Security considerations",
                securityConsiderations,
                selectedSafetyConsideration,
                (value, name) => handleSelectMethod(formData, setValue, setSelectedSafetyConsideration, value, name, 'securityConditions'),
                isGridVisibleConsideration,
                () => toggleGridVisibility(setIsGridVisibleConsideration, isGridVisibleConsideration),
                formData.securityGuests?.securityConditions,
                renderSecurityLabel
            )}
            {renderSecuritySection(
                "Security devices",
                securityDevices,
                selectedSafetyDevices,
                (value, name) => handleSelectMethod(formData, setValue, setSelectedSafetyDevices, value, name, 'securityDevices'),
                isGridVisibleDevices,
                () => toggleGridVisibility(setIsGridVisibleDevices, isGridVisibleDevices),
                formData.securityGuests?.securityDevices,
                renderSecurityLabelDevices
            )}
            {renderSecuritySection(
                "Property information",
                propertyInfo,
                selectedPropertyInfo,
                (value, name) => handleSelectMethod(formData, setValue, setSelectedPropertyInfo, value, name, 'propertyInfo'),
                isGridVisiblePropertyInfo,
                () => toggleGridVisibility(setIsGridVisiblePropertyInfo, isGridVisiblePropertyInfo),
                formData.securityGuests?.propertyInfo,
                renderSecurityLabelProperty
            )}
            
        </div>
    );
};

export default SecuritySection;
