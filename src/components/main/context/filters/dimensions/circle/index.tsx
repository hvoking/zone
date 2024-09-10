// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../geo';

const CircleDimensionsContext: React.Context<any> = createContext(null)

export const useCircleDimensions = () => {
	return (
		useContext(CircleDimensionsContext)
	)
}

export const CircleDimensionsProvider = ({children}: any) => {
	const { placeCoordinates } = useGeo();

	const [ radiusPosition, setRadiusPosition ] = useState(0.005);
	const [ circleRadius, setCircleRadius ] = useState(0.005);
	const [ circleGeometry, setCircleGeometry ] = useState<any>(null);
	
	const minBound = 0.001;
	const maxBound = 0.01;

	const createCircle = (center: any, radius: any, numPoints: any) => {
	  const circleCoords = [];

	  for (let i = 0; i < numPoints; i++) {
	    const angle = (i / numPoints) * 2 * Math.PI;
	    const x = center[0] + radius * Math.cos(angle);
	    const y = center[1] + radius * Math.sin(angle);

	    circleCoords.push([x, y]);
	  }

	  // Close the circle by adding the first point at the end
	  circleCoords.push(circleCoords[0]);

	  return {
	    "type": "FeatureCollection",
	    "features": [
	      {
	        "type": "Feature",
	        "geometry": {
	          "type": "Polygon",
	          "coordinates": [circleCoords]
	        }
	      }
	    ]
	  };
	}
	const longitude = placeCoordinates.longitude;
	const latitude = placeCoordinates.latitude;

	const centerCoord = [longitude, latitude];
	const circlePoints = 64;

	useEffect(() => {
		const res = createCircle(centerCoord, circleRadius, circlePoints);
		setCircleGeometry(res);
	}, [ placeCoordinates, circleRadius ]);

	return (
		<CircleDimensionsContext.Provider value={{ 
			circleGeometry, 
			circleRadius, setCircleRadius,
			radiusPosition, setRadiusPosition,
			maxBound, minBound
		}}>
			{children}
		</CircleDimensionsContext.Provider>
	)
}

CircleDimensionsContext.displayName = "CircleDimensionsContext";