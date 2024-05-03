import { Link } from "react-router-dom";
import { PropertyType } from "../../../backend/src/shared/types";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { MdApartment } from "react-icons/md";
import ImageCarousel from "./ImageCarousel"; // Adjust the path as per your file structure
import { CgArrowsExpandRight } from "react-icons/cg";
import ImageFullScreen from "./ImageFullScreen";
import { IoMdStar } from "react-icons/io";

type Props = {
    property: PropertyType;
};

const SearchResultsCard = ({ property }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredTitle, setIsHoveredTitle] = useState(false);
    const [isHoveredNote, setIsHoveredNote] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Dummy function that does nothing
    const dummyFunction = () => {};

    const handleExpandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsFullScreen(true);
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsFullScreen(true);
    };

    const openMapModal = () => {
        setShowMap(true);
    };

    const closeMapModal = () => {
        setShowMap(false);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px] rounded-md relative overflow-hidden grid grid-cols-[3fr] gap-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <ImageCarousel imageUrls={property.imageUrls} isHovered={isHovered} Delete={false} indexFound={0} onCarouselDataChange={dummyFunction}/>
                    <div className="absolute bottom-4 right-4">
                        <button onClick={handleExpandClick} className="text-white bg-black bg-opacity-30 rounded-md p-2 hover:bg-opacity-60 z-99">
                            <CgArrowsExpandRight className="h-4 w-4" />
                        </button>
                    </div>
                    {isFullScreen && (
                <ImageFullScreen
                    imageUrls={property.imageUrls}
                    currentIndex={currentImageIndex}
                    property={property}
                    onThumbnailClick={handleThumbnailClick}
                    setIsFullScreen={setIsFullScreen}
                />
            )}
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                <div className="flex justify-between">
                    <Link
                        to={`/detail/${property._id}`}
                        className="text-2xl font-bold cursor-pointer"
                        style={{ color: isHoveredTitle ? 'black' : '#1558B9', transition: 'color 0.3s' }}
                        onMouseEnter={() => setIsHoveredTitle(true)}
                        onMouseLeave={() => setIsHoveredTitle(false)}
                    >
                        {property.name}
                    </Link>
                    <div className="relative" onMouseEnter={() => setIsHoveredNote(true)} onMouseLeave={() => setIsHoveredNote(false)}>
                        <div className="font-bold flex items-center">
                            <IoMdStar className="mr-1"/> {property.ranking}
                        </div>
                        {isHoveredNote && (
                            <div className="absolute top-full left-0 bg-black text-white py-1 px-2 rounded-md text-xs" style={{ width: '150px' }}>
                                Classification of the property (Source: Airbnb)                           
                            </div>
                            
                        )}
                    </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <CiLocationOn className="mr-1" />
                            <div className="text-sm" >{property.street}</div>
                        </div>
                        <div>
                            
                        <u className="text-sm cursor-pointer" style={{ color: '#2563EB' }} onClick={openMapModal}>
                            Show on map
                        </u>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="line-clamp-4 text-sm">
                        {property.description}
                    </div>
                </div>
                <div className="grid grid-cols-2">
                <div className="grid grid-rows-2">
                    {property.type.spaceType === 'House' ? (
                        <div className="flex">
                            <GiHouse className="mr-3" style={{ fontSize: "22px" }} />
                            <div className="text-sm text-gray-600">{property.type.spaceType}</div>
                        </div>
                    ) : (
                        <div className="flex">
                            <MdApartment className="mr-3" style={{ fontSize: "22px" }} />
                            <div className="text-sm text-gray-600">{property.type.spaceType}</div>
                        </div>
                    )}
                    <div className="flex flex-cols">
                            <div className="pr-2 flex">
                                <IoBed className="mr-3" style={{ fontSize: "20px" }} />
                                <div className="mr-1 text-gray-600 text-sm">
                                    {property.roomsCounter.find((room) => room.type === "Bedrooms")?.counter} {' '}
                                    {property.roomsCounter.find((room) => room.type === "Bedrooms")?.counter === 1 ? 'Bedroom' : 'Bedrooms'}
                                </div>
                            </div>
                            <div className="flex pr-2">
                                        <FaShower className="mr-3 ml-2" style={{ fontSize: "20px" }} />
                                        <div className="mr-1 text-gray-600 text-sm">
                                            {property.roomsCounter.find((room) => room.type === "Bathrooms")?.counter} Bathrooms
                                        </div>
                                    </div>
                    </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">€{property.pricePerNight} per night</span>
                        <Link to={`/detail/${property._id}`} className="bg-blue-600 text-white p-2 font-bold text-l max-w-fit hover:bg-blue-500 transition rounded-md">View More</Link>
                    </div>
                </div>
            </div>

            {/* Map Modal */}
            {showMap && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    {/* Adjust the modal size and content based on your requirements */}
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Map</h2>
                        <iframe
                            title="Property Location"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG0qUTBcs3wxiJwvEEe5hKa7QEYYkPd2Y&q=${property.latitude},${property.longitude}`}
                            width="800"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen={true} // Set allowFullScreen to true when the modal is open
                            loading="lazy"
                        ></iframe>
                        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-500 transition" onClick={closeMapModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResultsCard;
