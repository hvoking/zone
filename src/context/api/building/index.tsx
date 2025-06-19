// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useModule } from 'context/filters/module';
import { useBuilding } from 'context/filters/building';
import { useSiteApi } from 'context/api/site';

const BuildingApiContext: React.Context<any> = createContext(null);

export const useBuildingApi = () => {
	return (
		useContext(BuildingApiContext)
	)
}

export const BuildingApiProvider = ({children}: any) => {
  const { apartmentSide, apartmentFront, apartmentHeight } = useModule();
  const { garages } = useBuilding();
  const { zoneData, siteData } = useSiteApi();

  const [ buildingData, setBuildingData ] = useState<any>(null);

  const parcelFront = siteData?.front;
  const occupancyRate = zoneData && siteData && zoneData.occupancy_rate * siteData.area;
  const zoneHeight = zoneData?.height;
  
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