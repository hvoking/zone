// App imports
import { LayersProvider } from './layers';

export const MapsProvider = ({children}: any) => {
  return (
    <LayersProvider>
      {children}
    </LayersProvider>
  )
}

MapsProvider.displayName="MapsProvider";