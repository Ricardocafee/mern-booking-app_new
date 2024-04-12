import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import MapDisplay from '../../components/MapDisplay';
import { PropertyFormData } from './ManagePropertyForm';

interface Location {
    lat: number;
    lng: number;
}

const MapSection = () => {
    const { watch, setValue } = useFormContext<PropertyFormData>();

    const LatitudeValue = watch('latitude');
    const LongitudeValue = watch('longitude');

    // State variables to hold selected latitude and longitude
    const [defaultLocation, setDefaultLocation] = useState<Location | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (LatitudeValue !== undefined && LongitudeValue !== undefined) {
                setDefaultLocation({
                    lat: LatitudeValue,
                    lng: LongitudeValue
                });
            } else {
                setDefaultLocation({
                    lat: 37.08,
                    lng: -8.25
                });
                setValue("latitude", 37.08);
                setValue("longitude", -8.25);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [LatitudeValue, LongitudeValue]);

    const apiKey = 'AIzaSyBG0qUTBcs3wxiJwvEEe5hKa7QEYYkPd2Y';

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Map Location</h2>
            {defaultLocation !== null ? (
                <MapDisplay apiKey={apiKey} defaultLocation={defaultLocation} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MapSection;
