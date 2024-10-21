// App imports
import { LeftSizesProvider } from './left';
import { RightSizesProvider } from './right';
import { MapSizesProvider } from './maps';
import { BarsSizesProvider } from './bars';

export const SizesProvider = ({children}: any) => {
  return (
    <BarsSizesProvider>
    <LeftSizesProvider>
    <RightSizesProvider>
    <MapSizesProvider>
      {children}
    </MapSizesProvider>
    </RightSizesProvider>
    </LeftSizesProvider>
    </BarsSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";