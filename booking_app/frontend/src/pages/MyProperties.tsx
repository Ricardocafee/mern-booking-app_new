import { useEffect, useState } from "react"; // Import useState from React
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { CiLocationOn } from "react-icons/ci";
import ProjectDescription from "../components/PropertyDescription";
import '../effects/TransitionSlide.css'; // Import CSS file for styling
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const MyProperties = () => {
    const { data: properties } = useQuery("fetchQuery", () => apiClient.fetchProperties());

    const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);

    useEffect(() => {
        if (properties) {
            setCurrentIndexes(Array(properties.length).fill(0));
        }
    }, [properties]);
    const [transition, setTransition] = useState("");
    const [propertyIndexInTransition, setPropertyIndexInTransition] = useState(-1);


    const transit = (direction: string, propertyIndex: number) => {
        setTransition("transition-" + direction);
        setPropertyIndexInTransition(propertyIndex);
        setTimeout(() => {
            setTransition("");
            setPropertyIndexInTransition(-1);
        }, 500);
    };


    useEffect(() => {
        console.log("Current Indexes:", currentIndexes);
    }, [currentIndexes]);

    const handleNext = (propertyIndex: number) => {
        transit("right", propertyIndex);
        setCurrentIndexes((prevIndexes) => {
            if (!properties || !properties[propertyIndex]) return prevIndexes; // If propertyData or propertyData[propertyIndex] is undefined, return previous indexes
            const updatedIndexes = [...prevIndexes];
            updatedIndexes[propertyIndex] = (updatedIndexes[propertyIndex] + 1) % properties[propertyIndex].imageUrls.length;
            return updatedIndexes;
        });
    };

    const handlePrev = (propertyIndex: number) => {
        transit("left", propertyIndex);
        setCurrentIndexes((prevIndexes) => {
            if (!properties || !properties[propertyIndex]) return prevIndexes; // If propertyData or propertyData[propertyIndex] is undefined, return previous indexes
            const updatedIndexes = [...prevIndexes];
            updatedIndexes[propertyIndex] = (updatedIndexes[propertyIndex] - 1 + properties[propertyIndex].imageUrls.length) % properties[propertyIndex].imageUrls.length;
            return updatedIndexes;
        });
    };

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
                {properties.map((property, propertyIndex) => ( // Added propertyIndex parameter
                    <div className="flex flex-col lg:flex-row justify-between border border-slae-300 rounded-lg p-8 gap-5">
                        <div className="lg:w-1/3 relative" style={{ position: 'relative', height: '270px', overflow: 'hidden' }}>
                            <img 
                                 src={property.imageUrls[currentIndexes[propertyIndex]]} 
                                 alt="Property" 
                                 className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out ${propertyIndex === propertyIndexInTransition ? transition : ''}`} 
                                 style={{ position: 'relative'}} // Initial transform
                            />
                            <div className="absolute inset-0 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity"> {/* Show arrows and circles on hover */}
                                {currentIndexes[propertyIndex] > 0 && (
                                    <button onClick={() => handlePrev(propertyIndex)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 w-10 h-10 hover:bg-opacity-100 flex items-center justify-center">
                                        <FaArrowLeft />
                                    </button>
                                )}
                                {currentIndexes[propertyIndex] < property.imageUrls.length - 1 && (
                                    <button onClick={() => handleNext(propertyIndex)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-100 w-10 h-10 flex items-center justify-center">
                                        <FaArrowRight />
                                    </button>
                                )}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                    {property.imageUrls.map((_, index) => (
                                        <div key={index} className={`h-2 w-2 rounded-full mx-1 ${index === currentIndexes[propertyIndex] ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                    )).slice(0, 5)}
                                </div>
                            </div>
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
                                <ProjectDescription name={property.name} description={property.description} />
                            </div>
                            {/* Other property details */}
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
