import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type Props = {
    imageUrls: string[];
    isHovered: boolean;
    Delete: boolean;
    indexFound: number;
    onCarouselDataChange: (data: string, index: number) => void;
};

const ImageCarousel: React.FC<Props> = ({ imageUrls, isHovered, Delete, indexFound, onCarouselDataChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transition, setTransition] = useState("");

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTransition("next");
        Delete = false;
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
            setTransition("");
        }, 50);
    };

    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTransition("prev");
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
            setTransition("");
        }, 50);
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string, indexImage: number) => {
        event.preventDefault();
        onCarouselDataChange(imageUrl, indexFound);

        let nextIndex = currentIndex;

        console.log("Current index", indexImage);
        console.log("Image url", imageUrl)

        // Determine the index of the next image after deletion
        if (indexImage === 0 && imageUrls.length > 0) {
            // If currentIndex is 0, and there are more than one image
            nextIndex = 0;
        } else if (indexImage > 0 && imageUrls.length > 1) {
            // If currentIndex is the last index, and there are more than one image
            nextIndex = indexImage - 1;
        }


        setCurrentIndex(nextIndex);
    };

    return (
        <div className="w-full h-[300px] rounded-md relative overflow-hidden">
            {imageUrls.map((imageUrl, index) => (
                
                <div key={index}>
                    <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className={`absolute w-full h-full object-cover object-center rounded-md transition-transform duration-500 ${
                            index === currentIndex ? "translate-x-0 opacity-100" : transition === "next" ? "translate-x-full opacity-0" : "translate-x-full opacity-0"
                        }`}
                    />
                    {isHovered && Delete  && (
                        
                        <button
                            className="absolute top-2 right-2 text-red-300  hover:text-red-500 cursor-pointer z-10 bg-black bg-opacity-30 rounded-full"
                            onClick={(event) => handleDelete(event, imageUrls[currentIndex], currentIndex)}
                        >
                            <MdDeleteForever style={{ fontSize: "22px" }} />
                        </button>
                    )}
                </div>
            ))}
            {isHovered && currentIndex !== 0 && (
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 w-10 h-10 hover:bg-opacity-100 flex items-center justify-center"
                    onClick={handlePrev}
                >
                    <FaArrowLeft />
                </button>
            )}
            {isHovered && currentIndex !== imageUrls.length - 1 && (
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-100 w-10 h-10 flex items-center justify-center"
                    onClick={handleNext}
                >
                    <FaArrowRight />
                </button>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {isHovered && imageUrls.length > 1 && imageUrls.slice(0, 5).map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
