// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../../filters/geo';

const ParcelCurvesApiContext: React.Context<any> = createContext(null)

export const useParcelCurvesApi = () => {
	return (useContext(ParcelCurvesApiContext))
}

export const ParcelCurvesApiProvider = ({children}: any) => {
	const { parcelId } = useGeo();
	const [ parcelCurvesData, setParcelCurvesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				parcel_curves_api
				?parcel_id=${parcelId}
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setParcelCurvesData(receivedData);
		}
		fetchData();
	}, [ parcelId ]);

	return (
		<ParcelCurvesApiContext.Provider value={{ parcelCurvesData }}>
			{children}
		</ParcelCurvesApiContext.Provider>
	)
}

ParcelCurvesApiContext.displayName = "ParcelCurvesApiContext";