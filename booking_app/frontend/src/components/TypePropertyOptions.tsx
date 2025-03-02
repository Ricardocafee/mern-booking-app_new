// TypePropertyOptions.tsx
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface OptionsProps {
    options: string[];
    initialOption: string; // New prop for the initial selected option
    onSelectOption: (option: string) => void; // Callback function to handle option selection
    originFunction: string;
}

const TypePropertyOptions: React.FC<OptionsProps> = ({ options, initialOption, onSelectOption, originFunction}) => {

    if(initialOption === ''){
        initialOption = options[0]
    }

    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(initialOption); // Set default selected option

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setShowOptions(false);
        onSelectOption(option); // Call the callback function with the selected option
    };

    return (
        <div className="relative w-full rounded-md py-1 p-2" style={{ border: '1px solid #CCCCCC'}}>
            {originFunction === 'Time_checkIn_start' && 
                <label className="text-gray-700 text-sm font-semibold flex-1 mb-2">Start time</label>
            }
            {originFunction === 'Time_checkIn_end' && 
                <label className="text-gray-700 text-sm font-semibold flex-1 mb-2">End time</label>
            }
            {originFunction === 'Time_checkOut' && 
                <label className="text-gray-700 text-sm font-semibold flex-1 mb-2">Select hour</label>
            }
            <div className="cursor-pointer mb-2 rounded-md flex justify-center" onClick={toggleOptions}>
            
                <div>{selectedOption}</div>
                <div className="ml-auto p-1">{showOptions ? <FaAngleUp /> : <FaAngleDown />}</div>
            </div>
            <div className={`absolute bg-white shadow-xl w-full overflow-y-auto`} style={{ maxHeight: '150px', border: '1px solid grey', zIndex: 2 , left: 0, display: showOptions ? 'block' : 'none' }}>
                <div>
                    {options.map(option => (
                        <div
                            key={option}
                            className={`cursor-pointer p-1 hover:bg-blue-500 hover:text-white ${
                                selectedOption === option ? 'bg-gray-200 border border-gray-400' : ''
                                }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TypePropertyOptions;
