// React imports
import { useContext, createContext } from 'react';

const StylesContext: React.Context<any> = createContext(null)

export const useStyles = () => {
	return (
		useContext(StylesContext)
	)
}

export const StylesProvider = ({children}: any) => {
	const fetchData = async (styleName: any) => {
		const url = `
	    	${process.env.REACT_APP_API_URL}/
	    	style/
	    	${styleName}
	    `.replace(/\s/g, '');
	  	const res = await fetch(url);
	    const receivedData = await res.json();
	    return receivedData;
	}

	return (
		<StylesContext.Provider value={{ fetchData }}>
			{children}
		</StylesContext.Provider>
	)
}

StylesContext.displayName = "StylesContext";