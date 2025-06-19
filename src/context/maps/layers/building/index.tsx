// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useSiteApi } from 'context/api/site';
import { useBuildingApi } from 'context/api/building';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';
import * as turf from '@turf/turf';

const BuildingContext: React.Context<any> = createContext(null)

export const useBuilding = () => {
  return (useContext(BuildingContext))
}

export const BuildingProvider = ({children}: any) => {
  const { envelopData } = useSiteApi();
  const { buildingData } = useBuildingApi();

  if (!envelopData || !buildingData) return <></>

  const frontBlocks = buildingData.front_blocks;
  const heights = Object.keys(frontBlocks);

  const buildingLayer = heights.map((item: any, index: any) => {
    const lastHeight: any = index > 0 ? heights[index - 1] : 0;
    let building = turf.buffer(envelopData, -item / 6, { units: 'meters' });

    return new GeoJsonLayer({
      id: `lot-building-${index}`,
      pickable: true,
      data: building,
      getFillColor: [255, 0, 0, 120],
      parameters: { depthTest: false },
      extruded: true,
      getElevation: Math.abs(-item - lastHeight) - lastHeight,
    })
  })

  return (
    <BuildingContext.Provider value={{ buildingLayer }}>
      {children}
    </BuildingContext.Provider>
  )
}

BuildingContext.displayName = "BuildingContext";