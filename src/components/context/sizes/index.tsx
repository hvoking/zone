// App imports
import { LeftSizesProvider } from './left';
import { RightSizesProvider } from './right';
import { MapSizesProvider } from './maps';

export const SizesProvider = ({children}: any) => {
  return (
    
    <LeftSizesProvider>
    <RightSizesProvider>
    <MapSizesProvider>
      {children}
    </MapSizesProvider>
    </RightSizesProvider>
    </LeftSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";