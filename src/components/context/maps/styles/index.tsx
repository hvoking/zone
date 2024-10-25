// React imports
import { useContext, createContext } from 'react';

const StylesContext: React.Context<any> = createContext(null)

export const useStyles = () => {
	return (
		useContext(StylesContext)
	)
}

export const StylesProvider = ({children}: any) => {
	const fetchData = async (tableName: string) => {
		const url = `
	    	${process.env.REACT_APP_API_URL}/
	    	style/
	    	${tableName}
	    `.replace(/\s/g, '');
	  	const res = await fetch(url);
	    const receivedData = await res.json();
	    return receivedData;
	}

	const getTilesUrl = (schemaName: string, tableName: string) => {
		const url = `
	    	${process.env.REACT_APP_API_URL}
	    	/tiles
	    	?table_schema=${schemaName}
	    	&table_name=${tableName}
	    	&x={x}
	    	&y={y}
	    	&z={z}
	    `.replace(/\s/g, '');
	    return url
	}

	return (
		<StylesContext.Provider value={{ fetchData, getTilesUrl }}>
			{children}
		</StylesContext.Provider>
	)
}

StylesContext.displayName = "StylesContext";