// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const GoogleReverseApiContext: React.Context<any> = createContext(null)

export const useGoogleReverseApi = () => {
	return (
		useContext(GoogleReverseApiContext)
	)
}

export const GoogleReverseApiProvider = ({children}: any) => {
	const [ parcelsProperties, setParcelsProperties ] = useState<any>({});
	const [ parcelLongitude, setParcelLongitude ] = useState<any>(null);
	const [ parcelLatitude, setParcelLatitude ] = useState<any>(null);
	const [ currentAddress, setCurrentAddress ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	reverse_api
	    	?language=pt_BR
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    const receivedAddress = receivedData.formatted_address;
	    const address = receivedAddress.split(",").slice(0, 3).join(",") + "," + receivedAddress.split(",").slice(-1)

	    setCurrentAddress(address);
	  }
	  parcelLongitude && fetchData();
	}, [ parcelLongitude ]);

	return (
		<GoogleReverseApiContext.Provider value={{ 
			parcelsProperties, setParcelsProperties,
			setParcelLatitude, setParcelLongitude,
			currentAddress
		}}>
			{children}
		</GoogleReverseApiContext.Provider>
	)
}

GoogleReverseApiContext.displayName = "GoogleReverseApiContext";