import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
    const { data: properties } = useQuery("fetchQuery", () => apiClient.fetchProperties());

    const topRowProperties = properties?.slice(0, 2) || [];
    const bottomRowProperties = properties?.slice(2) || [];

    return (
        <div className="space-y-3">
            <h2 className="text-3xl font-bold">Latest Destinations</h2>
            <p>Most recent destinations added by our hosts</p>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">{topRowProperties.map((property)=>(
                    <LatestDestinationCard property={property}/>
                ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {bottomRowProperties.map((property)=>(
                        <LatestDestinationCard property={property}/>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Home;