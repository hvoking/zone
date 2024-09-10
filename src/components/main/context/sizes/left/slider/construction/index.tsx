// React imports
import { useState, useContext, createContext } from 'react';

const ConstructionSliderSizesContext: React.Context<any> = createContext(null)

export const useConstructionSliderSizes = () => {
	return (
		useContext(ConstructionSliderSizesContext)
	)
}

export const ConstructionSliderSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 10, left: 0, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<ConstructionSliderSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</ConstructionSliderSizesContext.Provider>
	)
}

ConstructionSliderSizesContext.displayName = "ConstructionSliderSizesContext";