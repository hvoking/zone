// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useCircleDimensions } from '../../filters/dimensions/circle';
import { useGeo } from '../../filters/geo';

const PolygonApiContext: React.Context<any> = createContext(null)

export const usePolygonApi = () => {
	return (
		useContext(PolygonApiContext)
	)
}

export const PolygonApiProvider = ({children}: any) => {
	const { cityName, placeCoordinates } = useGeo();
	const { circleGeometry } = useCircleDimensions();

	const [ polygonData, setPolygonData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/polygon_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(circleGeometry.features[0].geometry),
			  		"longitude": JSON.stringify(placeCoordinates.longitude),
					"latitude": JSON.stringify(placeCoordinates.latitude),
					"schema": "limites",
					"table": "municipios_br",
				}),
			});
			const receivedData = await res.json();
			setPolygonData(receivedData[0]);
		}
		circleGeometry && fetchData();
	}, [ circleGeometry ]);

	return (
		<PolygonApiContext.Provider value={{ polygonData }}>
			{children}
		</PolygonApiContext.Provider>
	)
}

PolygonApiContext.displayName = "PolygonApiContext";