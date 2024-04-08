import { useEffect, useState } from 'react'

import MapPicker from 'react-google-map-picker'


const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 8;

enum MapTypeId {
  Roadmap = "roadmap",
  Satellite = "satellite",
  Hybrid = "hybrid",
  Terrain = "terrain"
}

const TypeMap: MapTypeId = MapTypeId.Roadmap;

const MapDisplay = () => {

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const typemap = TypeMap;

  const [apiLoaded, setApiLoaded] = useState(false);


  useEffect(() => {
    // Here you can perform any asynchronous operations required for map initialization,
    // such as loading Google Maps API script
    // Ensure that the necessary resources are loaded before setting apiLoaded to true

    // For demonstration purpose, setting apiLoaded to true after 2 seconds
    const timeout = setTimeout(() => {
      setApiLoaded(true);
    }, 500);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  function handleChangeLocation (lat: number, lng: number){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom:number){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }

  if(!apiLoaded) {
    return (
      <div>Loading...
      </div>
      
    )
  }

  return (
    <>
  <button onClick={handleResetLocation}>Reset Location</button>
  <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} disabled/>

  <div id='map' className='items-center' style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '5px'}}>
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    mapTypeId={typemap}
    style={{height:'700px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyBG0qUTBcs3wxiJwvEEe5hKa7QEYYkPd2Y'
    />
    </div>
  </>
  );
}

export default MapDisplay;