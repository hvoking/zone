// React imports
import { useCallback } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useGeo } from '../../../context/filters/geo';

// Third-party imports
import { Marker } from 'react-map-gl';

export const Pin = () => {
	const { marker, setMarker, setPlaceCoordinates } = useGeo();

	const onMarkerDrag = useCallback((event: any) => {
		const lat = event.lngLat.lat;
		const lng = event.lngLat.lng;
		setMarker({longitude: lng, latitude: lat});
	}, []);

	const onMarkerDragEnd = useCallback((event: any) => {
		const lat = event.lngLat.lat;
		const lng = event.lngLat.lng;
		setPlaceCoordinates({longitude: lng, latitude: lat});
	}, []);
	  
	return (
		<Marker
	      longitude={marker.longitude}
	      latitude={marker.latitude}
	      anchor="bottom"
	      draggable
	      onDrag={onMarkerDrag}
	      onDragEnd={onMarkerDragEnd}
	    >
	      <img 
		      style={{width: "25px"}} 
		      src={process.env.PUBLIC_URL + "/static/components/maps/marker.svg"} 
		      alt="marker"
	     />
	    </Marker>
	)
}

Pin.displayName="Pin";