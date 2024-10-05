// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../filters/geo';

const ZoneApiContext: React.Context<any> = createContext(null);

export const useZoneApi = () => {
	return (
		useContext(ZoneApiContext)
	)
}

export const ZoneApiProvider = ({children}: any) => {
  const { parcelId } = useGeo();
  const [ zoneData, setZoneData ] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const tempUrl = `
        ${process.env.REACT_APP_API_URL}/
        zone_api
        ?parcel_id=${parcelId}
      `;
      const url = tempUrl.replace(/\s/g, '');
      const res = await fetch(url);
      const receivedData = await res.json();
      setZoneData(receivedData)
    }
    fetchData();
  }, [ parcelId ]);

  return (
		<ZoneApiContext.Provider value={{ zoneData }}>
			{children}
		</ZoneApiContext.Provider>
	)
}

ZoneApiContext.displayName="ZoneApiContext";