// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { usePolygonApi } from '../../../api/polygon';
import { useVisibility } from '../../../filters/visibility/';

const DrainApiContext: React.Context<any> = createContext(null)

export const useDrainApi = () => {
	return (useContext(DrainApiContext))
}

export const DrainApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const [ drainData, setDrainData ] = useState<any>(null);
	const { activeDrain } = useVisibility();

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				drain_api
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setDrainData(receivedData);
		}
		activeDrain && fetchData();
	}, [ polygonData, activeDrain ]);

	return (
		<DrainApiContext.Provider value={{ drainData }}>
			{children}
		</DrainApiContext.Provider>
	)
}

DrainApiContext.displayName = "DrainApiContext";