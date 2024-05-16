//Icons
import { IoBed } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { LiaUtensilsSolid } from "react-icons/lia";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidDryer } from "react-icons/bi";
import { MdOutlinePool } from "react-icons/md";
import { PiCoatHanger, PiTelevisionSimpleBold } from "react-icons/pi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FaWifi } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { FaPumpSoap } from "react-icons/fa";
import { PiHandSoapLight } from "react-icons/pi";
import { TbIroning } from "react-icons/tb";
import { FaMosquitoNet } from "react-icons/fa6";
import { MdCurtains } from "react-icons/md";
import { SiApplearcade } from "react-icons/si";
import { LiaBookSolid } from "react-icons/lia";
import { CgGym } from "react-icons/cg";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { RiPingPongFill } from "react-icons/ri";
import { GiPoolTableCorner } from "react-icons/gi";
import { MdOutlineSurroundSound } from "react-icons/md";
import { MdOutlinePedalBike } from "react-icons/md";
import { GiFireplace } from "react-icons/gi";
import { LiaFanSolid } from "react-icons/lia";
import { FaFireExtinguisher } from "react-icons/fa";
import { GiFirstAidKit } from "react-icons/gi";
import { BsPersonWorkspace } from "react-icons/bs";
import { GiBarbecue } from "react-icons/gi";
import { FaBlender } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { MdCoffeeMaker } from "react-icons/md";
import { GiTable } from "react-icons/gi";
import { LuMicrowave } from "react-icons/lu";
import { TbFridge } from "react-icons/tb";
import { GiToaster } from "react-icons/gi";
import { FaWineGlass } from "react-icons/fa6";
import { FaUmbrellaBeach } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import { MdBalcony } from "react-icons/md";
import { MdElevator } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";

// Images 
import cleaningProductsImage from "../../../../images/cleaningProduct.png"
import centralHeatingImage from "../../../../images/centralHeating.png"
import hairDryerImage from "../../../../images/hairDryer.svg"
import bidetImage from "../../../../images/bidet.png"
import conditionerImage from "../../../../images/conditioner.png"
import hotWaterImage from "../../../../images/hotWater.png"
import outdoorShowerImage from "../../../../images/outdoorShower.jpeg"
import shampooImage from "../../../../images/shampoo.png"
import beddingImage from "../../../../images/bedding.png"
import clothesDryerImage from "../../../../images/clothesDryer.png"
import blanketsPillowsImage from "../../../../images/blanketsPillows.png"
import closetImage from "../../../../images/closet.png"
import babyBathImage from "../../../../images/babyBath.png"
import boardGamesImage from "../../../../images/boardGames.png"
import diaperChangerImage from "../../../../images/diaperChanger.png"
import childrenBookImage from "../../../../images/childrenBook.png"
import cradleImage from "../../../../images/cradle.png"
import highchairImage from "../../../../images/highchair.png"
import portableCradleImage from "../../../../images/portableCradle.png"
import ceilingFanImage from "../../../../images/ceilingFan.png"
import carbonMonoxideAlarmImage from "../../../../images/carbon-monoxide-alarm.png"
import smokeDetectorImage from "../../../../images/smokeDetector.jpg"
import roastingPanImage from "../../../../images/roastingPan.jpg"
import dishwasherImage from "../../../../images/dishwasher.jpg"
import freezerImage from "../../../../images/freezer.png"
import hotWaterKettleImage from "../../../../images/hotwaterKettle.png"
import ovenImage from "../../../../images/oven.png"
import stoveImage from "../../../../images/stove.png"
import privateImage from "../../../../images/private.png"
import backyardImage from "../../../../images/backyard.png"
import outdoorDiningImage from "../../../../images/outdoorDining.png"
import sunloungersImage from "../../../../images/sunloungers.png"
import electricVehicleChargerImage from "../../../../images/electricVehicleCharger.png"
import jacuzziImage from "../../../../images/jacuzzi.png"
import paidCarParkImage from "../../../../images/paidCarPark.png"
import saunaImage from "../../../../images/sauna.png"
import breakfastIncludedImage from "../../../../images/breakfastIncluded.png"
import longtermStayImage from "../../../../images/longtermStay.png"



export const iconMap: { [key: string]: JSX.Element } = {

    //Popular
  "Bedroom": <IoBed className="mr-3" style={{ fontSize: "35px" }} />,
  "Air Conditioning": <TbAirConditioning className="mr-3" style={{ fontSize: "35px" }}/>,
  "Basic Kitchen Utensils": <LiaUtensilsSolid className="mr-3" style={{ fontSize: "35px" }}/>,
  "Cleaning Products": <img src={cleaningProductsImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Crockery and Cutlery": <FaKitchenSet className="mr-3" style={{ fontSize: "35px" }}/>,
  "Central Heating": <img src={centralHeatingImage} className="mr-3" style={{ width: "35px", height: "40px" }} />,
  "Dryer": <BiSolidDryer className="mr-3" style={{ fontSize: "35px" }}/>,
  "Hair Dryer": <img src={hairDryerImage} className="mr-3" style={{ width: "35px", height: "40px" }} />,
  "Swimming Pool": <MdOutlinePool className="mr-3" style={{ fontSize: "35px" }}/>,
  "TV Cable": <PiTelevisionSimpleBold className="mr-3" style={{ fontSize: "35px" }}/>,
  "Washing Machine": <CgSmartHomeWashMachine className="mr-3" style={{ fontSize: "35px" }}/>,
  "Wifi": <FaWifi className="mr-3" style={{ fontSize: "31px" }}/>,

  //Bathroom
  "Bathtub": <GiBathtub className="mr-3" style={{ fontSize: "35px" }}/>,
  "Bidet": <img src={bidetImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Body Soap": <FaPumpSoap className="mr-4" style={{ fontSize: "31px" }}/>,
  "Conditioner": <img src={conditionerImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Hot Water": <img src={hotWaterImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Outdoor Shower": <img src={outdoorShowerImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Shampoo": <img src={shampooImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Shower Gel": <PiHandSoapLight className="mr-3" style={{ fontSize: "35px" }}/>,

  //Bedroom
  "Bedding": <img src={beddingImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Closet": <img src={closetImage} className="mr-3" style={{ width: "35px", height: "35px" }}/>,
  "Clothes Drying Rack": <img src={clothesDryerImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Extra Blankets and Pillows": <img src={blanketsPillowsImage} className="mr-3" style={{ width: "35px", height: "38px" }} />,
  "Hangers": <PiCoatHanger className="mr-3" style={{ fontSize: "35px" }}/>,
  "Iron": <TbIroning className="mr-3" style={{ fontSize: "35px" }}/>,
  "Mosquito Nets": <FaMosquitoNet className="mr-3" style={{ fontSize: "35px" }}/>,
  "Curtains for the Bedroom": <MdCurtains className="mr-3" style={{ fontSize: "35px" }}/>,

    //Entertainment
  "Arcade Games": <SiApplearcade className="mr-3" style={{ fontSize: "35px" }}/>,
  "Books and Reading Material": <LiaBookSolid className="mr-3" style={{ fontSize: "35px" }}/>,
  "Gym Equipment": <CgGym className="mr-3" style={{ fontSize: "35px" }}/>,
  "Video Game Console": <MdOutlineVideogameAsset className="mr-3" style={{ fontSize: "35px" }}/>,
  "Ping-pong Table": <RiPingPongFill className="mr-3" style={{ fontSize: "35px" }}/>,
  "Pool Table": <GiPoolTableCorner className="mr-3" style={{ fontSize: "35px" }}/>,
  "Sound System": <MdOutlineSurroundSound className="mr-3" style={{ fontSize: "35px" }}/>,
  "Television": <PiTelevisionSimpleBold className="mr-3" style={{ fontSize: "35px" }}/>,

  // Family
  "Baby Bathtub": <img src={babyBathImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Children's Bikes": <MdOutlinePedalBike className="mr-3" style={{ fontSize: "35px" }}/>,
  "Board Games": <img src={boardGamesImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Diaper Changer": <img src={diaperChangerImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Books and Toys for Children": <img src={childrenBookImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Cradle": <img src={cradleImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "High Chair": <img src={highchairImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Portable Cradle": <img src={portableCradleImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,

  //Heating and Cooling
  "Ceiling Fan": <img src={ceilingFanImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Indoor Fireplace": <GiFireplace className="mr-3" style={{ fontSize: "35px" }}/>,
  "Portable Fans": <LiaFanSolid className="mr-3" style={{ fontSize: "35px" }}/>,

  //Home and Security
  "Carbon Monoxide Alarm": <img src={carbonMonoxideAlarmImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
  "Fire Extinguisher": <FaFireExtinguisher className="mr-3" style={{ fontSize: "35px" }}/>,
  "First Aid Kit": <GiFirstAidKit className="mr-3" style={{ fontSize: "35px" }}/>,
  "Smoke Detector": <img src={smokeDetectorImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,

  //Internet and Office
  "Exclusive Workspace": <BsPersonWorkspace className="mr-3" style={{ fontSize: "35px" }}/>,
  "Portable Wifi": <FaWifi className="mr-3" style={{ fontSize: "31px" }}/>,

  //Kitchen
    "Roasting Pan": <img src={roastingPanImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Barbecue utensils": <GiBarbecue className="mr-3" style={{ fontSize: "35px" }}/>,
    "Blender": <FaBlender className="mr-5" style={{ fontSize: "28px" }}/>,
    "Coffee": <FaCoffee className="mr-4" style={{ fontSize: "31px" }}/>,
    "Coffee Maker": <MdCoffeeMaker className="mr-3" style={{ fontSize: "35px" }}/>,
    "Dining Table": <GiTable className="mr-3" style={{ fontSize: "35px" }}/>,
    "Dishwasher": <img src={dishwasherImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Freezer": <img src={freezerImage} className="mr-6" style={{ width: "23px", height: "35px" }} />,
    "Hot Water Kettle": <img src={hotWaterKettleImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Microwave": <LuMicrowave className="mr-3" style={{ fontSize: "35px" }}/>,
    "Oven": <img src={ovenImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Fridge": <TbFridge className="mr-3" style={{ fontSize: "35px" }}/>,
    "Stove": <img src={stoveImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Toaster": <GiToaster className="mr-3" style={{ fontSize: "35px" }}/>,
    "Wine Glasses": <FaWineGlass className="mr-3" style={{ fontSize: "35px" }}/>,

    //Location features
    "Access to the beach": <FaUmbrellaBeach className="mr-3" style={{ fontSize: "35px" }}/>,
    "Laundry nearby": <MdLocalLaundryService className="mr-3" style={{ fontSize: "35px" }}/>,
    "Private Entrance": <img src={privateImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,

    //Outdoor
    "Backyard": <img src={backyardImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Barbecue": <GiBarbecue className="mr-3" style={{ fontSize: "35px" }}/>,
    "Bicycles": <MdOutlinePedalBike className="mr-3" style={{ fontSize: "35px" }}/>,
    "Outdoor Dining Area": <img src={outdoorDiningImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Patio or Balcony": <MdBalcony className="mr-3" style={{ fontSize: "35px" }}/>,
    "Sun Loungers": <img src={sunloungersImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,

    //Parking
    "Lift": <MdElevator className="mr-3" style={{ fontSize: "35px" }}/>,
    "Electric Vehicle Charger": <img src={electricVehicleChargerImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Free Parking": <FaParking className="mr-3" style={{ fontSize: "35px" }}/>,
    "Gym": <CgGym className="mr-3" style={{ fontSize: "35px" }}/>,
    "Jacuzzi": <img src={jacuzziImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Paid Car Park": <img src={paidCarParkImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Sauna": <img src={saunaImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,

    //Services
    "Breakfast Included": <img src={breakfastIncludedImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,
    "Cleaning available during stay": <MdCleaningServices className="mr-3" style={{ fontSize: "35px" }}/>,
    "Long-term stays permitted": <img src={longtermStayImage} className="mr-3" style={{ width: "35px", height: "35px" }} />,

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