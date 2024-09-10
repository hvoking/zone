// React imports
import { useState, useRef, useEffect, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null);

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const [ basemap, setBasemap ] = useState("mapbox://styles/hvoking/clrwzn1jo015q01nl53664m2c");
	const [ cityName, setCityName ] = useState("blumenau")
	const [ cityId, setCityId ] = useState<any>(37);
	
	const [ parcelId, setParcelId ] = useState(41351);
	const [ placeId, setPlaceId ] = useState(41351);

	const [ viewport, setViewport ] = useState(Locations.blumenau);
	
	const [ placeCoordinates, setPlaceCoordinates ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	const [ marker, setMarker ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	useEffect(() => {
	  setViewport({...viewport, ...placeCoordinates});
	}, [ placeCoordinates ]);

	const mapRef = useRef<any>();

	useEffect(() => {
		mapRef.current?.flyTo({
			center: [ viewport.longitude, viewport.latitude ],
			zoom: viewport.zoom,
			duration: 3000, 
			essential: true,
		});
		setMarker({
			longitude: viewport.longitude,
			latitude: viewport.latitude,
		});
	}, [ viewport ]);

	return (
		<GeoContext.Provider value={{
			mapRef,
			basemap, setBasemap,
			viewport, setViewport,
			cityName, setCityName,
			parcelId, setParcelId,
			cityId, setCityId, 
			marker, setMarker,
			placeCoordinates, setPlaceCoordinates,
			placeId, setPlaceId
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";