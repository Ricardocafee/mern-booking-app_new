//Icons
import { BsSafe } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import "../../effects/DiagLine.css"
import smartLockImage from "../../../../images/smartLock.svg"
import numericKeypadImage from "../../../../images/numericKeypad.png"
import handOverImage from "../../../../images/handOver.png"


export const iconMap: { [key: string]: JSX.Element } = {

  "Smart lock": <img src={smartLockImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Numeric keypad": <img src={numericKeypadImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Safety deposit box": <BsSafe className="mr-3" style={{ fontSize: "35px" }}/>,
  "Building staff": <FaPeopleGroup className="mr-3" style={{ fontSize: "35px" }}/>,
  "Personal greetings": <img src={handOverImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
};

// Function to render the icon based on the provided key
export const renderIconByKey = (key: string): JSX.Element => {
  // Check if the key exists in the iconMap
  if (iconMap.hasOwnProperty(key)) {
    return iconMap[key];
  } else {
    // Return a default icon or handle the case where the key doesn't exist
    return <div>Icon not found for key: {key}</div>;
  }
};


  export const MyComponent: React.FC<{ iconName: string }> = ({ iconName }) => {
  return (
    <div>
      {/* Render the icon based on the provided key */}
      {renderIconByKey(iconName)}
    </div>
  );
};

export default MyComponent;