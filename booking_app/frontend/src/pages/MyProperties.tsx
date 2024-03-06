import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';

const MyProperties = () => {
    const { data: propertyData } = useQuery(
        "fetchMyProperties",
        apiClient.fetchMyProperties, 
        {
        onError: ()=> {},
}
);

if(!propertyData){
    return <span>No Properties found</span>;
}
    return (<div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Properties</h1>
                <Link to="/add-property" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">Add Property</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {propertyData.map((property)=> (
                    <div className="flex flex-col justify-between border border-slae-300 rounded-lg p-8 gap-5">
                        <h2 className="text-2xl font-bold">{property.name}</h2>
                        <div className="whitespace-pre-line">{property.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-1"/>
                                {property.city}, {property.country}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-1"/>
                                {property.type}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1"/>
                                €{property.pricePerNight} per night
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiHotel className="mr-1"/>
                                {property.adultCount} adults, {property.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1"/>
                                {property.starRating} Star Rating
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link to={`/edit-property/${property._id}`} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">View Details</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperties;