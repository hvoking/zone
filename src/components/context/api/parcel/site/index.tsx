// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../filters/geo';

const SiteApiContext: React.Context<any> = createContext(null);

export const useSiteApi = () => {
	return (
		useContext(SiteApiContext)
	)
}

export const SiteApiProvider = ({children}: any) => {
  const { parcelId } = useGeo();
  const [ siteData, setSiteData ] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const tempUrl = `
        ${process.env.REACT_APP_API_URL}/
        site_api
        ?parcel_id=${parcelId}
      `;
      const url = tempUrl.replace(/\s/g, '');
      const res = await fetch(url);
      const receivedData = await res.json();
      setSiteData(receivedData)
    }
    fetchData();
  }, [ parcelId ]);

  return (
		<SiteApiContext.Provider value={{ siteData }}>
			{children}
		</SiteApiContext.Provider>
	)
}

SiteApiContext.displayName="SiteApiContext";