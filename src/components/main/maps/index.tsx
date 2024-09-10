// React imports
import { useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Controllers } from './controllers';
import { Wrapper } from './wrapper'

// Layers imports
import { Layers } from './layers';

// Context imports
import { useGeo } from '../context/filters/geo';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
  const { mapRef, basemap, viewport, setPlaceCoordinates } = useGeo();

  const onDblClick = useCallback((e: any) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setPlaceCoordinates({ longitude: lng, latitude: lat });
  }, []); 

  return (
    <Wrapper>
      <Map
        ref={mapRef}
        mapStyle={basemap}
        initialViewState={viewport} 
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        doubleClickZoom={false}
        onDblClick={onDblClick}
      >
        <Layers/>
        <Controllers/>
        <Pin/>
      </Map>

    </Wrapper>
  );
}

Maps.displayName="Maps";