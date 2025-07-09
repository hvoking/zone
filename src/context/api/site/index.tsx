// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { zoneProperties, baseGeometry } from './data';

// Context imports
import { useGeo } from 'context/geo';

const SiteApiContext: React.Context<any> = createContext(null);

export const useSiteApi = () => {
	return (
		useContext(SiteApiContext)
	)
}

export const SiteApiProvider = ({children}: any) => {
  const { parcelId } = useGeo();
  const [ siteData, setSiteData ] = useState<any>(null);
  const [ envelopData, setEnvelopData ] = useState<any>(baseGeometry);
  const [ zoneData, setZoneData ] = useState<any>(zoneProperties);
  
  useEffect(() => {
    const fetchData = async () => {
      const tempUrl = `
        ${process.env.REACT_APP_API_URL}/
        site_api
        ?parcel_id=${parcelId}
      `;
      const url = tempUrl.replace(/\s/g, '');
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const receivedData = await res.json();
        setSiteData(receivedData);
      }
      catch (error) {
        console.error("Error fetching address:", error);
        return null;
      }
    }
    fetchData();
  }, [ parcelId ]);

  return (
		<SiteApiContext.Provider value={{ 
      siteData,
      envelopData, setEnvelopData,
      zoneData, setZoneData
    }}>
			{children}
		</SiteApiContext.Provider>
	)
}

SiteApiContext.displayName="SiteApiContext";