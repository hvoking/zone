// React imports
import { useState, useContext, createContext } from 'react';

// App imports
import { data } from './data';

const EnvelopApiContext: React.Context<any> = createContext(null);

export const useEnvelopApi = () => {
	return (
		useContext(EnvelopApiContext)
	)
}

export const EnvelopApiProvider = ({children}: any) => {
  const [ envelopData, setEnvelopData ] = useState<any>(data);

  return (
		<EnvelopApiContext.Provider value={{ envelopData, setEnvelopData }}>
			{children}
		</EnvelopApiContext.Provider>
	)
}

EnvelopApiContext.displayName="EnvelopApiContext";