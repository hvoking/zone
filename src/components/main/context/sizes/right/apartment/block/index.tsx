// React imports
import { useState, useContext, createContext } from 'react';

const ApartmentBlockSizesContext: React.Context<any> = createContext(null)

export const useApartmentBlockSizes = () => {
	return (
		useContext(ApartmentBlockSizesContext)
	)
}

export const ApartmentBlockSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = {top: 10, bottom: 10, left: 10, right: 10}

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<ApartmentBlockSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</ApartmentBlockSizesContext.Provider>
	)
}

ApartmentBlockSizesContext.displayName = "ApartmentBlockSizesContext";