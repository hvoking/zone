// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { usePolygonApi } from '../../../../api/polygon';
import { useVisibility } from '../../../../filters/visibility';

const ParcelsCurvesApiContext: React.Context<any> = createContext(null)

export const useParcelsCurvesApi = () => {
	return (useContext(ParcelsCurvesApiContext))
}

export const ParcelsCurvesApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const [ parcelsCurvesData, setParcelsCurvesData ] = useState<any>(null);
	const { activeCurves } = useVisibility();

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				parcels_curves_api
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setParcelsCurvesData(receivedData);
		}
		activeCurves && fetchData();
	}, [ polygonData, activeCurves ]);

	return (
		<ParcelsCurvesApiContext.Provider value={{ parcelsCurvesData }}>
			{children}
		</ParcelsCurvesApiContext.Provider>
	)
}

ParcelsCurvesApiContext.displayName = "ParcelsCurvesApiContext";