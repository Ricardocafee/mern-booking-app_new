import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PropertyType } from "../../../backend/src/shared/types";

type Props = {
    property: PropertyType;
};

const SearchResultsCard = ({ property }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img 
                    src={property.imageUrls[0]} 
                    alt={property.name} 
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: property.starRating }, (_, index) => (
                                <AiFillStar key={index} className="fill-yellow-400" />
                            ))}
                        </span>
                    </div>
                    <Link to={`/detail/${property._id}`} className="text-2xl font-bold cursor-pointer">
                        {property.name}
                    </Link>
                </div>
                <div>
                    <div className="line-clamp-4">
                        {property.description}
                    </div>
                </div>
                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                   
                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">€{property.pricePerNight} per night</span>
                        <Link to={`/detail/${property._id}`} className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500">View More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;
