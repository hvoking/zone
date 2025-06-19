// React imports
import { useState, useContext, createContext } from 'react';

const BarsSizesContext: React.Context<any> = createContext(null)

export const useBarsSizes = () => {
	return (
		useContext(BarsSizesContext)
	)
}

export const BarsSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 10, bottom: 0, left: 0, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<BarsSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</BarsSizesContext.Provider>
	)
}

BarsSizesContext.displayName = "BarsSizesContext";