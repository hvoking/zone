// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useModule } from '../../../filters/module';
import { useBuilding } from '../../../filters/building';
import { useZoneApi } from '../zone';
import { useSiteApi } from '../site';

const BuildingApiContext: React.Context<any> = createContext(null);

export const useBuildingApi = () => {
	return (
		useContext(BuildingApiContext)
	)
}

export const BuildingApiProvider = ({children}: any) => {
  const { apartmentSide, apartmentFront, apartmentHeight } = useModule();
  const { garages } = useBuilding();
  const { zoneData } = useZoneApi();
  const { siteData } = useSiteApi();

  const [ buildingData, setBuildingData ] = useState<any>(null);

  const parcelFront = siteData && siteData.front;
  const occupancyRate = zoneData && siteData && zoneData.occupancy_rate * siteData.area;
  const zoneHeight = zoneData && zoneData.height;
  
  useEffect(() => {
    const fetchData = async () => {
      const tempUrl = `
        ${process.env.REACT_APP_API_URL}/
        building_api
        ?apartment_side=${Math.round(apartmentSide * 10) / 10}
        &apartment_front=${Math.round(apartmentFront * 10) / 10}
        &apartment_height=${Math.round(apartmentHeight * 10) / 10}
        &parcel_front=${parcelFront}
        &occupancy_rate=${occupancyRate}
        &zone_height=${zoneHeight}
        &garages=${garages}
      `;
      const url = tempUrl.replace(/\s/g, '');
      const res = await fetch(url);
      const receivedData = await res.json();
      setBuildingData(receivedData)
    }
    zoneData && siteData && fetchData();
  }, [ zoneData, siteData, apartmentSide, apartmentFront, apartmentHeight ]);

  return (
		<BuildingApiContext.Provider value={{ buildingData }}>
			{children}
		</BuildingApiContext.Provider>
	)
}

BuildingApiContext.displayName="BuildingApiContext";