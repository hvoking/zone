// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';

const CurvesApiContext: React.Context<any> = createContext(null)

export const useCurvesApi = () => {
	return (useContext(CurvesApiContext))
}

export const CurvesApiProvider = ({children}: any) => {
	const { parcelId } = useGeo();
	const [ curvesData, setCurvesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				curves_api
				?parcel_id=${parcelId}
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setCurvesData(receivedData);
		}
		fetchData();
	}, [ parcelId ]);

	return (
		<CurvesApiContext.Provider value={{ curvesData }}>
			{children}
		</CurvesApiContext.Provider>
	)
}

CurvesApiContext.displayName = "CurvesApiContext";