import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import PriceFilter from "../components/PriceFilter";

export type TypeFacilities = {
    type: string;
    facilities: string[];
};

const Search = () => {
    const search = useSearchContext();

    const [page, setPage] = useState<number>(1);

    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };

    const { data: propertyData } = useQuery(["searchProperties", searchParams], () =>
        apiClient.SearchProperties(searchParams)
    );

    // Filter properties based on their state being "Available"
    const availableProperties = propertyData?.data.filter(property => property.state === "Available") || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {propertyData?.pagination.total} Properties found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>

                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {/* Map over availableProperties instead of propertyData?.data */}
                {availableProperties.map((property) => (
                    <SearchResultsCard key={property._id} property={property} />
                ))}
                <div>
                    <Pagination
                        page={propertyData?.pagination.page || 1}
                        pages={propertyData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
