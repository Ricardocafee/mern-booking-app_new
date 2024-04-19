// LatestDestinationCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgArrowsExpandRight } from "react-icons/cg";
import '../effects/TransitionOpacity.css';
import { PropertyType } from "../../../backend/src/shared/types";
import ImageFullScreen from "./ImageFullScreen";

type Props = {
    property: PropertyType;
};

const LatestDestinationCard = ({ property }: Props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsFullScreen(true);
    };

    const handleExpandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsFullScreen(true);
    };

    return (
        <Link to={`/detail/${property._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
            <div className="h-[300px]">
                <img src={property.imageUrls[0]} className="w-full h-full object-cover object-center rounded-md" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-700"></div>
                <div className="absolute bottom-0 left-2 p-7 text-white">
                    <span className="text-lg font-bold">{property.pricePerNight}€ per night</span>
                </div>
                <div className="absolute bottom-0 right-0 p-4">
                    <button onClick={handleExpandClick} className="text-white bg-black bg-opacity-30 rounded-md p-2 hover:bg-opacity-60">
                        <CgArrowsExpandRight className="h-4 w-4" />
                    </button>
                </div>
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
        </Link>
    );
};

export default LatestDestinationCard;
