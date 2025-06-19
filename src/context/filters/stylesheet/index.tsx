// React imports
import { useState, useContext, createContext } from 'react';

const StyleSheetContext: React.Context<any> = createContext(null)

export const useStyleSheet = () => {
	return (useContext(StyleSheetContext))
}

export const StyleSheetProvider = ({children}: any) => {
	const [ linesColor, setLinesColor ] = useState("rgba(255, 255, 255, 1)");
	const [ linesWidth, setLinesWidth ] = useState(0.3);
	const [ fillColor, setFillColor ] = useState("rgba(255, 255, 255, 0.2)")

	return (
		<StyleSheetContext.Provider value={{ 
			linesColor, setLinesColor,
			linesWidth, setLinesWidth,
			fillColor, setFillColor,
		}}>
			{children}
		</StyleSheetContext.Provider>
	)
}

StyleSheetContext.displayName = "StyleSheetContext";