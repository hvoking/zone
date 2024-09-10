// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { usePolygonApi } from '../../../api/polygon';

const ParcelsApiContext: React.Context<any> = createContext(null)

export const useParcelsApi = () => {
	return (useContext(ParcelsApiContext))
}

export const ParcelsApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const [ parcelsData, setParcelsData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	parcels_api
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setParcelsData(receivedData[0][0]);
	  }
	  polygonData && fetchData();
	}, [ polygonData ]);

	return (
		<ParcelsApiContext.Provider value={{ parcelsData }}>
			{children}
		</ParcelsApiContext.Provider>
	)
}

ParcelsApiContext.displayName = "ParcelsApiContext";