import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import LatestDestinationCard from "../components/LatestDestinationCard";
import { CiLocationOn } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TbBeach } from "react-icons/tb";


const Home = () => {
    const { data: properties } = useQuery("fetchQuery", () => apiClient.fetchProperties());

    const topRowProperties = properties?.slice(0, 2) || [];
    const bottomRowProperties = properties?.slice(2, 5) || [];

    return (
        <div className="space-y-3">
            <h2 className="text-3xl font-bold">Latest Destinations</h2>
            <p>Most recent destinations added by our hosts</p>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">{topRowProperties.map((property)=>(
                    <div className="p-2 hover:shadow-lg hover:bg-gradient-to-b from-blue-50 to-blue-100 ">
                    
                    <LatestDestinationCard property={property} />
                   <div className="p-4 flex flex-col">
                    <div className="font-bold text-lg">
                        {property.name}
                    </div>
                    <div className="text-sm text-gray-600 flex"> {/* Apply text-sm class for smaller text size, text-gray-600 for grey color, and flex for flexbox layout */}
                    <CiLocationOn className="mr-1 mt-0.5" /> {/* Use mr-1 for margin-right spacing */}
                    {property.street}
                </div>
                <div className="mt-2 flex flex-wrap">
                        <div className="border-r border-gray-400 pr-2 flex items-center">
                            <IoBed className="mr-3" style={{ fontSize: "22px" }}/>
                            <div className="mr-1 text-gray-600">
                            {property.roomsCounter.find(room => room.type === "Bedrooms")?.counter}
                            {" "}
                            Bedroom{property.roomsCounter.find(room => room.type === "Bedrooms")?.counter === 1 ? "" : "s"}
                            </div>
                        </div>
                        <div className="flex border-r border-gray-400 pr-2 items-center">
                            <FaShower className="mr-3 ml-2" style={{ fontSize: "22px" }}/>
                            <div className="mr-1 text-gray-600">
                            {property.roomsCounter.find(room => room.type === "Bathrooms")?.counter}
                            {" "}
                            Bathroom{property.roomsCounter.find(room => room.type === "Bathrooms")?.counter === 1 ? "" : "s"}
                            </div>
                        </div>
                        <div className="flex pr-2 items-center">
                            <TbBeach className="mr-3 ml-2" style={{ fontSize: "22px" }}/>
                            <div className="mr-1 text-gray-600">
                                Beach 2.2 km away
                            </div>
                        </div>
                    </div>
                    </div> 

                </div>
                ))}
                
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    
                    {bottomRowProperties.map((property)=>(
                        <div className="p-2 hover:shadow-lg hover:bg-gradient-to-b from-blue-50 to-blue-100 ">
                        <div className="">
                        <LatestDestinationCard property={property} />
                        
                        <div className="p-4 flex flex-col">
                            <div className="font-bold text-lg">
                                {property.name}
                            </div>
                            <div className="text-sm text-gray-600 flex"> {/* Apply text-sm class for smaller text size, text-gray-600 for grey color, and flex for flexbox layout */}
                                <CiLocationOn className="mr-1 mt-0.5" /> {/* Use mr-1 for margin-right spacing */}
                                {property.street}
                            </div>
                            <div className="mt-2 flex flex-wrap">
                        <div className="border-r border-gray-400 pr-2 flex items-center">
                            <IoBed className="mr-3" style={{ fontSize: "22px" }}/>
                            <div className="mr-1 text-gray-600">
                            {property.roomsCounter.find(room => room.type === "Bedrooms")?.counter}
                            </div>
                        </div>
                        <div className="flex border-r border-gray-400 pr-2 items-center">
                            <FaShower className="mr-3 ml-2" style={{ fontSize: "22px" }}/>
                            <div className="mr-1 text-gray-600">
                            {property.roomsCounter.find(room => room.type === "Bathrooms")?.counter} 
                            </div>
                        </div>
                        <div className="flex pr-2 items-center">
                            <TbBeach className="mr-3 ml-2" style={{ fontSize: "22px" }}/>
                            <div className="mr-1 text-gray-600">
                                2.2 km away
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Home;