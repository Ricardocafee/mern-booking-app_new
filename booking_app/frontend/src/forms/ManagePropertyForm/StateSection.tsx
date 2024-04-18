import React, { useEffect, useState } from 'react';
import { State } from '../../config/property-options-state';
import { PropertyFormData } from './ManagePropertyForm';
import { useFormContext } from 'react-hook-form';

const StateSection = () => {
    // Get the default selected state from the form context
    const { watch, setValue, getValues } = useFormContext<PropertyFormData>();
    const optionSelected = watch("state");

    // State to store the selected state, with the default value from the form context
    const [selectedState, setSelectedState] = useState(optionSelected || 'Available');

    useEffect(() => {
        // Set a timeout to read the option after a certain delay (e.g., 500 milliseconds)
        const timeout = setTimeout(() => {
            const optionSelected = watch("state");
            setSelectedState(optionSelected || 'Available');
        }, 300);

        // Clean up the timeout on unmount or when the dependency array changes
        return () => clearTimeout(timeout);
    }, []); // Empty dependency array to mimic componentDidMount

    // Function to handle the change in selected state
    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = event.target.value;
        setSelectedState(newState);
        setValue("state", newState); // Set the value in the form context
        console.log(getValues())
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">State</h2>
            <div className="grid grid-cols-2 gap-3">
                {/* Radio buttons for selecting state */}
                {State.map((state, index) => (
                    <div key={index} className="mb-2">
                        <input
                            type="radio"
                            id={`state-${index}`}
                            value={state}
                            checked={selectedState === state}
                            onChange={handleStateChange}
                            style={{
                                width: '1.1em',
                                height: '1.1em',
                                borderRadius: '50%',
                                border: '2px solid #4A5568'
                            }}
                        />
                        <label htmlFor={`state-${index}`} className="ml-2">
                            <span style={{ marginTop: '-3px' }}>{state}</span><br />
                            {getDescription(state)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Function to get description for each state
const getDescription = (state: string) => {
    switch (state) {
        case "Available":
            return <span className="text-sm text-gray-500">Guests can find your advert in the search results and request or book available dates.</span>;
        case "Paused":
            return <span className="text-sm text-gray-500">Guests will not be able to see or book your advert in search results. You can put your advert on hold for up to 6 months.</span>;
        case "Not announced":
            return <span className="text-sm text-gray-500">Guests can't book your advert or find it in the search results.</span>;
        case "Deactivated":
            return <span className="text-sm text-gray-500">Permanently remove your advert.</span>;
        default:
            return "";
    }
};

export default StateSection;
