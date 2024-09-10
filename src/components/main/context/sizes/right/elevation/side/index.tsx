// React imports
import { useState, useContext, createContext } from 'react';

const SideElevationSizesContext: React.Context<any> = createContext(null)

export const useSideElevationSizes = () => {
	return (
		useContext(SideElevationSizesContext)
	)
}

export const SideElevationSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 10, bottom: 20, left: 30, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<SideElevationSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</SideElevationSizesContext.Provider>
	)
}

SideElevationSizesContext.displayName = "SideElevationSizesContext";