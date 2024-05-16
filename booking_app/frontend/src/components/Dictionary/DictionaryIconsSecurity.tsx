import React from "react";
import "../../effects/DiagLine.css";

import adultImage from "../../../../images/13plus.png"
import gateImage from "../../../../images/gate.png"
import quietTimeImage from "../../../../images/quietTime.jpg"
import playStructureImage from "../../../../images/playStructure.png"
import dangerousAnimalsImage from "../../../../images/dangerousAnimals.png"
import securityCameraImage from "../../../../images/securityCamera.png"
import decibelMeterImage from "../../../../images/decibelMeter.png"
import carbonMonoxideAlarmImage from "../../../../images/carbon-monoxide-alarm.png"
import smokeDetectorImage from "../../../../images/smokeDetector.jpg"
import noiseImage from "../../../../images/noise.png"
import sharedPlaceImage from "../../../../images/sharedPlace.png"
import limitedAmenitiesImage from "../../../../images/limitedAmenities.png"
import weaponImage from "../../../../images/weapon.png"

import { LuBaby } from "react-icons/lu";
import { LuWaves } from "react-icons/lu";
import { FaPersonFalling } from "react-icons/fa6";
import { FaStairs } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { BsSignNoParking } from "react-icons/bs";


// Define the iconMap with proper types
export const iconMap: { [key: string]: { allowed: JSX.Element, disallowed: JSX.Element } } = {
  "Not suitable for children aged 2 to 12": {
    allowed: <img src={adultImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={adultImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "Not suitable for babies under 2 years old": {
    allowed: <LuBaby  className="mr-3 diag" style={{ fontSize: "35px", opacity:  0.85 }} />,
    disallowed: <LuBaby className="mr-3 diag" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
  "Swimming pool or hot tub without a gate or lock": {
    allowed: <img src={gateImage} className="mr-3 diag" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={gateImage} className="mr-3 diag" style={{ width: "35px", height: "35px" }} />,
  },
  "Quiet time": {
    allowed: <img src={quietTimeImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={quietTimeImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "By the water, like a lake or river": {
    allowed: <LuWaves className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <LuWaves className="mr-3 diag" style={{ fontSize: "35px", opacity: 0.85 }} />
  },
  "There are climbing or play structures on the property": {
    allowed: <img src={playStructureImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={playStructureImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "There are elevated areas without handrails or protection": {
    allowed: <FaPersonFalling className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <FaPersonFalling className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
  },
  "There are potentially dangerous animals on the property": {
    allowed: <img src={dangerousAnimalsImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={dangerousAnimalsImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "There is a security camera outside": {
    allowed: <img src={securityCameraImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={securityCameraImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "There is a decibel meter in the accommodation": {
    allowed: <img src={decibelMeterImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={decibelMeterImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "Carbon monoxide detector installed": {
    allowed: <img src={carbonMonoxideAlarmImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={carbonMonoxideAlarmImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "Smoke detector installed": {
    allowed: <img src={smokeDetectorImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={smokeDetectorImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "Guests have to climb stairs": {
    allowed: <FaStairs  className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <FaStairs  className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
  },
  "There may be noise during stays": {
    allowed: <img src={noiseImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={noiseImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "There are pets on the property": {
    allowed: <MdOutlinePets  className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <MdOutlinePets  className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
  },
  "No car park on the property": {
    allowed: <BsSignNoParking  className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
    disallowed: <BsSignNoParking  className="mr-3" style={{ fontSize: "35px", opacity: 1 }} />,
  },
  "The property has shared spaces": {
    allowed: <img src={sharedPlaceImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={sharedPlaceImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "Limited basic amenities": {
    allowed: <img src={limitedAmenitiesImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={limitedAmenitiesImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
  "There are weapons on the property": {
    allowed: <img src={weaponImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    disallowed: <img src={weaponImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  },
};


// Function to render the icon based on the provided key and checked state
export const renderIconByKeySecurity = (key: string, checked: string): JSX.Element | null => {
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
      {renderIconByKeySecurity(iconName, checked)}
    </div>
  );
};

export default MyComponent;
