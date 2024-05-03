import { useState} from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { CiLocationOn } from "react-icons/ci";
import ProjectDescription from "../components/PropertyDescription";
import '../effects/TransitionSlide.css';
import ImageCarousel from "../components/ImageCarousel"; // Import ImageCarousel component

const MyProperties = () => {
    const { data: properties } = useQuery("fetchQuery", () => apiClient.fetchProperties());
    const [isHovered, setIsHovered] = useState(false);

    // Dummy function that does nothing
    const dummyFunction = () => {};

    if (!properties) {
        return <span>No Properties found</span>;
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Properties</h1>
                <Link to="/add-property" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-md transition">Add Property</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {properties.map((property) => (
                    <div className="flex flex-col lg:flex-row justify-between border border-slae-300 rounded-lg p-8 gap-5" key={property._id}>
                        <div className="lg:w-1/3 relative" 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            <ImageCarousel imageUrls={property.imageUrls} isHovered={isHovered} Delete={false} indexFound={0} onCarouselDataChange={dummyFunction}/>
                                
                               
                        </div>
                        <div className="lg:w-2/3">
                            <h2 className="text-2xl font-bold">{property.name}</h2>
                            <div className="flex">
                                <CiLocationOn className="mr-1 mt-1.5" />
                                <div>
                                    <u>{property.country}</u> . <u>{property.city}</u> . {property.street}
                                </div>
                            </div>
                            <div className="flex" style={{ paddingTop: '15px' }}>
                                <ProjectDescription name={property.name} description={property.description} length={200}/>
                            </div>
                            <span className="flex justify-end ">
                                <Link to={`/edit-property/${property._id}`} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-md transition">View Details</Link>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperties;
