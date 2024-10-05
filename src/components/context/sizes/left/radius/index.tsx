// React imports
import { useState, useContext, createContext } from 'react';

const RadiusSizesContext: React.Context<any> = createContext(null)

export const useRadiusSizes = () => {
	return (
		useContext(RadiusSizesContext)
	)
}

export const RadiusSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 10, left: 0, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<RadiusSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</RadiusSizesContext.Provider>
	)
}

RadiusSizesContext.displayName = "RadiusSizesContext";