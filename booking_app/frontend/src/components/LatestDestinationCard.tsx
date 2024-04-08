import { Link } from "react-router-dom"
import { PropertyType } from "../../../backend/src/shared/types"
import { CgArrowsExpandRight } from "react-icons/cg";
import { useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import '../effects/TransitionOpacity.css';



type Props = {
    property: PropertyType
}

const LatestDestinationCard = ({ property }:Props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [transition, setTransition] = useState("");

    const transit = (direction: string) => {
        setTransition("transition-" + direction);
        setTimeout(() => {
            setTransition("");
        }, 500);
    };

    const openFullScreen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default behavior of link
        setIsFullScreen(true);
    };

    const closeFullScreen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default behavior of link
        setIsFullScreen(false);
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            // If the click occurred on the backdrop itself (outside the image), close full screen
            event.preventDefault(); // Prevent default behavior of link
            setIsFullScreen(false);
        }
    };

    const nextImage: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        transit("right");
        setCurrentImageIndex((prevIndex) => (prevIndex === property.imageUrls.length - 1 ? 0 : prevIndex + 1));
        
    };

    const prevImage: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        transit("left");
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.imageUrls.length - 1 : prevIndex - 1));
    };

    const handleThumbnailClick = (event: React.MouseEvent<HTMLImageElement>, index: number) => {
        event.preventDefault(); // Prevent default behavior of the click event
        setCurrentImageIndex(index);
        setIsFullScreen(true);
    };
    

    return (
        <Link to={`/detail/${property._id}`} className="relative cursor-pointer overflow-hidden rounded-md">

            <div className="h-[300px]">
                <img src={property.imageUrls[0]} className="w-full h-full object-cover object-center rounded-md"/>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-700"></div>
                <div className="absolute bottom-0 left-2 p-7 text-white">
                    <span className="text-lg font-bold">{property.pricePerNight}€ per night</span>
                </div>
                <div className="absolute bottom-0 right-0 p-4">
                    <button onClick={openFullScreen} className="text-white bg-black bg-opacity-30 rounded-md p-2 hover:bg-opacity-60">
                        {/* Replacing the SVG icon with the CgArrowsExpandRight icon */}
                        <CgArrowsExpandRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
            

            {isFullScreen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleBackdropClick}>
                    <div className="max-w-screen-lg mx-auto">
                        <img src={property.imageUrls[currentImageIndex]}  className={`w-[800px] max-h-full ${transition}`}
                            alt="Full Screen"
                            />
                        <button onClick={prevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:text-gray-300 transition">
                        <IoIosArrowDropleft style={{ fontSize: "52px" }}/>
                        </button>
                        <button onClick={nextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-gray-300 transition ">
                        <IoIosArrowDropright style={{ fontSize: "52px"}}/>
                        </button>
                        <button onClick={closeFullScreen} className="absolute top-4 right-4 text-white hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="absolute bottom-5 w-full">
                        <div className="flex justify-center mt-4">
                            {property.imageUrls.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    className={`w-13 h-12 mx-2 mt-4 cursor-pointer ${currentImageIndex === index ? "border-2 border-blue-500" : ""}`}
                                    alt={`Thumbnail ${index}`}
                                    onClick={(event) => handleThumbnailClick(event, index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                
            )}


            {/*
            <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
                <span className="text-white font-bold tracking-tight text-3xl">{property.name}</span>
            </div>
    */}
        </Link>
    );
};

export default LatestDestinationCard;