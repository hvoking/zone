// React imports
import { useState, useContext, createContext } from 'react';

const BuildingContext: React.Context<any> = createContext(null)

export const useBuilding = () => {
	return (
		useContext(BuildingContext)
	)
}

export const BuildingProvider = ({children}: any) => {
	const [ undergroundHeight, setUndergroundHeight ] = useState(6);
	const [ floors, setFloors ] = useState(3);
	const [ maxFloors, setMaxFloors ] = useState(6);
	const [ floorHeight, setFloorHeight ] = useState(3);
	const [ garages, setGarages ] = useState(2);
		
	return (
		<BuildingContext.Provider value={{
			undergroundHeight, setUndergroundHeight,
			floors, setFloors,
			maxFloors, setMaxFloors,
			floorHeight, setFloorHeight,
			garages, setGarages,
		}}>
			{children}
		</BuildingContext.Provider>
	)
}

BuildingContext.displayName = "BuildingContext";