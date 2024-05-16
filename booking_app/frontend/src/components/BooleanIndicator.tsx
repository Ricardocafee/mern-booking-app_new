import React, { useState, useEffect } from 'react';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import '../effects/BooleanIndicator.css'; // Import CSS file for styling

interface BooleanIndicatorProps {
    selected: string | null;
    onSelect: (value: string | null, name: string) => void; // Updated onSelect prop to allow null value
    name: string;
    booleanInd: { name: string; allowed: string }[];
}

const BooleanIndicator: React.FC<BooleanIndicatorProps> = ({ selected, onSelect, name, booleanInd }) => {
    const [isAllowed, setIsAllowed] = useState<string | null>(null);

    useEffect(() => {
        if (booleanInd) {
        const rule = booleanInd.find(rule => rule.name === name);
        if (rule) {
            setIsAllowed(rule.allowed);
        } else {
            setIsAllowed(null);
        }
        }
    }, [booleanInd, name]);

    const handleToggle = (newValue: string | null) => {
        setIsAllowed(newValue);
        onSelect(newValue, name); // Call onSelect with the appropriate value
    };

    return (
        <div>
            <div>
                <label className={`pr-12 ${selected ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' } }>
                    <button
                        type="button"
                        className={`indicator-button ${isAllowed === "allowed" ? 'selected' : ''} `}
                        onClick={() => handleToggle(isAllowed === "allowed" ? null : "allowed")}
                        style={{ backgroundColor: 'white' }}
                    >
                        <CiCircleCheck className={`circle-plus ${isAllowed === "allowed" ? 'selected' : ''} `} />
                    </button>

                    <button
                        type="button"
                        className={`indicator-button ${isAllowed === "disallowed" ? 'selected' : ''}`}
                        onClick={() => handleToggle(isAllowed === "disallowed" ? null : "disallowed")}
                        style={{ backgroundColor: 'white' }}
                    >
                        <CiCircleRemove className={`circle-plus ${isAllowed === "disallowed" ? 'selected' : ''} `} />
                    </button>
                </label>
            </div>
        </div>
    );
};

export default BooleanIndicator;
