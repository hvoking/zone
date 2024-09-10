// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../../context/filters/geo';

const GoogleDetailsApiContext: React.Context<any> = createContext(null)

export const useGoogleDetailsApi = () => {
	return (
		useContext(GoogleDetailsApiContext)
	)
}

export const GoogleDetailsApiProvider = ({children}: any) => {
	const { placeId, setPlaceCoordinates } = useGeo();
	const [ googleDetailsData, setGoogleDetailsData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	details_api
	    	?place_id=${placeId}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setGoogleDetailsData(receivedData)
	  }
	  placeId && fetchData();
	}, [ placeId ]);

	useEffect(() => {
		if (googleDetailsData && googleDetailsData.result) {
			const longitude = googleDetailsData.result.geometry.location.lng;
			const latitude = googleDetailsData.result.geometry.location.lat;
			setPlaceCoordinates({longitude: longitude, latitude: latitude});
		}
	}, [ googleDetailsData ])

	return (
		<GoogleDetailsApiContext.Provider value={{ googleDetailsData }}>
			{children}
		</GoogleDetailsApiContext.Provider>
	)
}

GoogleDetailsApiContext.displayName = "GoogleDetailsApiContext";