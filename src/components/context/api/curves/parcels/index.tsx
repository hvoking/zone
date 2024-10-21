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
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				parcels_curves_api
				?schema=ambiental
				&table=blumenau_curvas
				&polygon=${JSON.stringify(circleGeometry.geometry)}
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setParcelsCurvesData(receivedData);
		}
		activeCurves && fetchData();
	}, [ activeCurves ]);

	return (
		<ParcelsCurvesApiContext.Provider value={{ parcelsCurvesData }}>
			{children}
		</ParcelsCurvesApiContext.Provider>
	)
}

ParcelsCurvesApiContext.displayName = "ParcelsCurvesApiContext";