// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../filters/geo';

const EnvelopApiContext: React.Context<any> = createContext(null);

export const useEnvelopApi = () => {
	return (
		useContext(EnvelopApiContext)
	)
}

export const EnvelopApiProvider = ({children}: any) => {
  const { parcelId } = useGeo();
  const [ envelopData, setEnvelopData ] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const tempUrl = `
        ${process.env.REACT_APP_API_URL}/
        envelop_api
        ?parcel_id=${parcelId}
      `;
      const url = tempUrl.replace(/\s/g, '');
      const res = await fetch(url);
      const receivedData = await res.json();
      setEnvelopData(receivedData)
    }
    fetchData();
  }, [ parcelId ]);

  return (
		<EnvelopApiContext.Provider value={{ envelopData }}>
			{children}
		</EnvelopApiContext.Provider>
	)
}

EnvelopApiContext.displayName="EnvelopApiContext";