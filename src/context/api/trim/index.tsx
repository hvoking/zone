// React imports
import { useContext, createContext } from 'react';

const TrimApiContext: React.Context<any> = createContext(null)

export const useTrimApi = () => {
	return (useContext(TrimApiContext))
}

export const TrimApiProvider = ({children}: any) => {
	const fetchData = async (polygon: any, tableSchema: any, tableName: any, tableColumn: any) => {
		try {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/trim_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(polygon),
					"table_schema": tableSchema,
					"table_name": tableName,
					"table_column": tableColumn
				}),
			});
			if (!res.ok) {
	          throw new Error(`HTTP error! status: ${res.status}`);
	        }
			const receivedData = await res.json();
			return receivedData
		}
		catch (error) {
	        console.error("Error fetching address:", error);
	        return null;
	      }
	}

	return (
		<TrimApiContext.Provider value={{ fetchData }}>
			{children}
		</TrimApiContext.Provider>
	)
}

TrimApiContext.displayName = "TrimApiContext";