import React, { FC, useRef, useEffect, useState, FormEvent } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import useOnclickOutside from "react-cool-onclickoutside";
import '../effects/SearchLocation.css'
import { TbMapPinSearch } from "react-icons/tb";
import { PropertyFormData } from '../forms/ManagePropertyForm/ManagePropertyForm';
import { useFormContext } from 'react-hook-form';



function isGoogleMapScriptLoaded(id: string): boolean {
    const scripts: HTMLCollectionOf<HTMLScriptElement> = document.head.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute('id') === id) {
            return true;
        }
    }
    return false;
}

function loadScript(src: string, id: string): Promise<void> {
    if (isGoogleMapScriptLoaded(id)) {
        // Make sure the script is loaded
        return new Promise((resolve) => setTimeout(resolve, 500));
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', id);
        script.src = src;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = reject;

        document.head.appendChild(script);
    });
}

type Location = {
    lat: number;
    lng: number;
};

enum MapTypeId {
    Roadmap = 'roadmap',
    Satellite = 'satellite',
    Hybrid = 'hybrid',
    Terrain = 'terrain',
}

interface Place {
    description: string;
    // Add other properties if needed
}

type Props = {
    apiKey: string;
    defaultLocation: Location;
    zoom?: number;
    onChangeLocation?(lat: number, lng: number): void;
    onChangeZoom?(zoom: number): void;
    style?: React.CSSProperties;
    className?: string;
    mapTypeId?: MapTypeId;
};

function isValidLocation(location: Location) {
    return location && Math.abs(location.lat) <= 90 && Math.abs(location.lng) <= 180;
}



const GOOGLE_SCRIPT_URL = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initMap&key=';

const MapPicker: FC<Props> = ({ apiKey, defaultLocation, zoom = 12, onChangeLocation, onChangeZoom, style, mapTypeId }) => {
    const MAP_VIEW_ID = useRef(`google-map-view-${Math.random().toString(36).substr(2, 9)}`);
    const map = useRef<google.maps.Map | null>(null);


    const { setValue} = useFormContext<PropertyFormData>();

    const marker = useRef<google.maps.Marker | null>(null);

    const [latitude, setLatitude] = useState<number>(defaultLocation.lat);
    const [longitude, setLongitude] = useState<number>(defaultLocation.lng);


    // Update latitude and longitude when marker position changes
    useEffect(() => {
      if (marker.current) {
          const position = marker.current.getPosition();
          if (position) {
              setLatitude(position.lat());
              setLongitude(position.lng());
          }
      }
  }, [marker.current]);

  

    function handleChangeLocation() {
        if (onChangeLocation && marker.current) {
            const currentLocation = marker.current.getPosition();
            if (currentLocation) {
                onChangeLocation(currentLocation.lat(), currentLocation.lng());
            }
        }
    }

    function handleChangeZoom() {
        onChangeZoom && onChangeZoom(map.current?.getZoom() || 0);
    }


      const Search = () => {
        const {
            ready,
            value,
            suggestions: { status, data },
            setValue: autoSetCompleteValue,
            clearSuggestions
        } = usePlacesAutocomplete({
            callbackName: "initMap",
            debounce: 300
        });

        const ref = useOnclickOutside(() => {
            // When the user clicks outside of the component, we can dismiss
            // the searched suggestions by calling this method
            clearSuggestions();
          });

        const handleInput = (e: FormEvent<HTMLInputElement>) => {
            // Update the keyword of the input element
            console.log(e.currentTarget.value);
            autoSetCompleteValue(e.currentTarget.value);
        };

        const handleSelect = ({ description }: Place) => () => {
            // Your function logic remains the same
            autoSetCompleteValue(description, false);
            clearSuggestions();
        
            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                console.log("📍 Coordinates: ", { lat, lng });

                if (marker.current) {
                    marker.current.setPosition({ lat, lng });
                    setLatitude(lat);
                    setLongitude(lng);
                }

                if (map.current) {
                    map.current.panTo({ lat, lng });
                    map.current.setZoom(12);
                }

                setValue("latitude", lat);
                setValue("longitude", lng);
        
                // Handle location change if provided
                handleChangeLocation();
            }
        
        );


        };

        const renderSuggestions = () => {

            return (
                <ul>
                    {data.map((suggestion) => {
                        const {
                            place_id,
                            structured_formatting: { main_text, secondary_text },
                        } = suggestion;

                        return (
                            <div className='flex items-center hover:bg-gray-200 border-t border-b transition'>
                            <TbMapPinSearch/>
                            <li
                                key={place_id}
                                onClick={handleSelect(suggestion)}
                                style={{ cursor: 'pointer' }}
                                className="suggestion-item "
                            >
                                <strong>{main_text}</strong> <small>{secondary_text}</small>
                            </li>
                            </div>
                        );
                    })}
                </ul>
            );
        };

            return (
                <div ref={ref} className='rounded-md'>
                    <input
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Select a location"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
                        className='suggestions-bar'
                    />
                  {/* We can use the "status" to decide whether we should display the dropdown or not */}

                  {status === "OK" && <div className='suggestions-container'>{renderSuggestions()}</div>}
                </div>
              );
    }


    function loadMap() {
        const Google = window.google as typeof google;
        const validLocation = isValidLocation(defaultLocation) ? defaultLocation : { lat: 0, lng: 0 };

        if (!document.getElementById(MAP_VIEW_ID.current)) {
            console.error(`Element with ID ${MAP_VIEW_ID.current} not found.`);
            return;
        }

        map.current = new Google.maps.Map(document.getElementById(MAP_VIEW_ID.current) as HTMLElement, {
            center: validLocation,
            zoom: zoom,
            ...(mapTypeId && { mapTypeId }),
        });

        
            marker.current = new Google.maps.Marker({
                position: validLocation,
                map: map.current,
                draggable: true,
            });
            

            // Add event listener for marker position changes
            Google.maps.event.addListener(marker.current, 'dragend', () => {
              const position = marker.current?.getPosition();
              if (position) {
                  setLatitude(position.lat());
                  setLongitude(position.lng());
                  setValue("latitude", position.lat());
                  setValue("longitude", position.lng());
                  handleChangeLocation();
              }
          });
         


          map.current.addListener('click', function (event: google.maps.MouseEvent) {
            const clickedPosition = event.latLng;
            if (clickedPosition && marker.current) {
                marker.current.setPosition(clickedPosition);
                setLatitude(clickedPosition.lat());
                setLongitude(clickedPosition.lng());
                setValue("latitude", clickedPosition.lat());
                setValue("longitude", clickedPosition.lng());
                handleChangeLocation();
            }
        });

        map.current.addListener('zoom_changed', handleChangeZoom);
    }
    

    useEffect(() => {
        loadScript(GOOGLE_SCRIPT_URL + apiKey, 'google-maps-' + apiKey)
            .then(loadMap)
            .catch((error) => console.error('Error loading Google Maps script:', error));
    }, [apiKey]);


    useEffect(() => {
        if (map.current) {
            map.current.setZoom(zoom);
        }
    }, [zoom]);

    const componentStyle = Object.assign({ width: '100%', height: '600px' }, style || {});


    return (
        <div style={{ position: 'relative', width: '100%', height: '600px' }}>
            <div className='rounded-md flex search-bar'>
                <Search />
            </div>
            <div id={MAP_VIEW_ID.current} style={componentStyle} className='rounded-md border border-solid border-gray-400'></div>
            <div className='text-sm'>
                <p><strong>Latitude</strong>: {latitude}</p>
                <p><strong>Longitude</strong>: {longitude}</p>
            </div>
        </div>
    );
};



export default MapPicker;