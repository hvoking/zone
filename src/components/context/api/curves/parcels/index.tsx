// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useVisibility } from '../../../filters/visibility';
import { useCircle } from '../../../circle';

const ParcelsCurvesApiContext: React.Context<any> = createContext(null)

export const useParcelsCurvesApi = () => {
	return (useContext(ParcelsCurvesApiContext))
}

export const ParcelsCurvesApiProvider = ({children}: any) => {
	const [ parcelsCurvesData, setParcelsCurvesData ] = useState<any>(null);
	const { activeCurves } = useVisibility();
	const { circleGeometry } = useCircle();

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/parcels_curves_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(circleGeometry.geometry),
					"schema": "ambiental",
					"table": "blumenau_curvas"
				}),
			});
			const receivedData = await res.json();
			setParcelsCurvesData(receivedData);
		}
		activeCurves && fetchData();
	}, [ activeCurves, circleGeometry ]);

	return (
		<ParcelsCurvesApiContext.Provider value={{ parcelsCurvesData }}>
			{children}
		</ParcelsCurvesApiContext.Provider>
	)
}

ParcelsCurvesApiContext.displayName = "ParcelsCurvesApiContext";