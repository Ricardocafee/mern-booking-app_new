
import MapDisplay from "../../components/MapDisplay";

const MapSection = () => {

    // State variables to hold selected latitude and longitude

    const apiKey = 'AIzaSyBG0qUTBcs3wxiJwvEEe5hKa7QEYYkPd2Y';
    const defaultLocation = { lat: 0, lng: 0 }; // Default location example

   
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Map Location</h2>
            
            <MapDisplay apiKey={apiKey} defaultLocation={defaultLocation} />
            
        </div>
    );
};

export default MapSection;
