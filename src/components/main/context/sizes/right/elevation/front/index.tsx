// React imports
import { useState, useContext, createContext } from 'react';

const FrontElevationSizesContext: React.Context<any> = createContext(null)

export const useFrontElevationSizes = () => {
	return (
		useContext(FrontElevationSizesContext)
	)
}

export const FrontElevationSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 20, bottom: 10, left: 30, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<FrontElevationSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</FrontElevationSizesContext.Provider>
	)
}

FrontElevationSizesContext.displayName = "FrontElevationSizesContext";