// ImageFullScreen.tsx
import React, { useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import '../effects/TransitionOpacity.css';
import { PropertyType } from "../../../backend/src/shared/types";

type Props = {
    imageUrls: string[];
    currentIndex: number;
    property: PropertyType;
    onThumbnailClick: (index: number) => void;
    setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageFullScreen: React.FC<Props> = ({ imageUrls, currentIndex, property, setIsFullScreen }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [transition, setTransition] = useState("");

    const transit = (direction: string) => {
        setTransition("transition-" + direction);
        setTimeout(() => {
            setTransition("");
        }, 500);
    };

    const closeFullScreen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsFullScreen(false);
    };

    const nextImage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        transit("right");
        setCurrentImageIndex((prevIndex) => (prevIndex === property.imageUrls.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        transit("left");
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.imageUrls.length - 1 : prevIndex - 1));
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
            <button onClick={prevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:text-gray-300 transition">
                <IoIosArrowDropleft style={{ fontSize: "52px" }} />
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-gray-300 transition ">
                <IoIosArrowDropright style={{ fontSize: "52px" }} />
            </button>
            <button onClick={closeFullScreen} className="absolute top-4 right-4 text-white hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="max-w-screen-lg mx-auto relative">
                <img
                    src={imageUrls[currentImageIndex]}
                    className={`w-[800px] max-h-full ${transition}`}
                    alt="Full Screen"
                />
            </div>

            <div className="absolute bottom-5 w-full">
                <div className="flex justify-center mt-4">
                    {imageUrls.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            className={`w-13 h-12 mx-2 mt-4 cursor-pointer ${currentImageIndex === index ? "border-2 border-blue-500" : ""}`}
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageFullScreen;
