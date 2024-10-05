// React imports
import { useState, useContext, createContext } from 'react';

const LayoutSizesContext: React.Context<any> = createContext(null)

export const useLayoutSizes = () => {
	return (
		useContext(LayoutSizesContext)
	)
}

export const LayoutSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = {top: 0, bottom: 0, left: 20, right: 20}

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<LayoutSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</LayoutSizesContext.Provider>
	)
}

LayoutSizesContext.displayName = "LayoutSizesContext";