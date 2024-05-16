import React from "react";
import "../../effects/DiagLine.css";
import { MdOutlinePets } from "react-icons/md";
import { LuPartyPopper } from "react-icons/lu";
import { LuCigarette } from "react-icons/lu";
import { IoMdVolumeHigh } from "react-icons/io";
import { FaCameraRetro } from "react-icons/fa6";

// Define the iconMap with proper types
export const iconMap: { [key: string]: { allowed: JSX.Element, disallowed: JSX.Element } } = {
  "Pets allowed": {
    allowed: <MdOutlinePets className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <MdOutlinePets className="mr-3 diag" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
  "Events allowed": {
    allowed: <LuPartyPopper className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <LuPartyPopper className="mr-3 diag" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
  "Smoking, vapourising and the use of electronic cigarettes are allowed": {
    allowed: <LuCigarette className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <LuCigarette className="mr-3 diag" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
  "Quiet time": {
    allowed: <IoMdVolumeHigh className="mr-3 diag" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <IoMdVolumeHigh className="mr-3" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
  "Commercial photography and filming allowed": {
    allowed: <FaCameraRetro className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <FaCameraRetro className="mr-3 diag" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
};

// Function to render the icon based on the provided key and checked state
export const renderIconByKeyRule = (key: string, checked: string): JSX.Element | null => {
  // Check if the key exists in the iconMap
  if (iconMap.hasOwnProperty(key)) {
    // Select the appropriate icon based on the checked state
    return checked === 'allowed' ? iconMap[key].allowed : iconMap[key].disallowed;
  } else {
    // Return null if the key doesn't exist
    return null;
  }
};

// MyComponent component
export const MyComponent: React.FC<{ iconName: string, checked: string }> = ({ iconName, checked }) => {
  return (
    <div>
      {/* Render the icon based on the provided key and checked state */}
      {renderIconByKeyRule(iconName, checked)}
    </div>
  );
};

export default MyComponent;
