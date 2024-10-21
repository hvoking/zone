// React imports
import { useState, useContext, createContext } from 'react';

const ParcelSliderSizesContext: React.Context<any> = createContext(null)

export const useParcelSliderSizes = () => {
	return (
		useContext(ParcelSliderSizesContext)
	)
}

export const ParcelSliderSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 10, left: 0, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<ParcelSliderSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</ParcelSliderSizesContext.Provider>
	)
}

ParcelSliderSizesContext.displayName = "ParcelSliderSizesContext";