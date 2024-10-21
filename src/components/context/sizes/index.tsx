// App imports
import { LeftSizesProvider } from './left';
import { RightSizesProvider } from './right';
import { MapSizesProvider } from './maps';
import { BarsSizesProvider } from './bars';
import { SliderSizesProvider } from './slider';

export const SizesProvider = ({children}: any) => {
  return (
    <BarsSizesProvider>
    <LeftSizesProvider>
    <RightSizesProvider>
    <MapSizesProvider>
    <SliderSizesProvider>
      {children}
    </SliderSizesProvider>
    </MapSizesProvider>
    </RightSizesProvider>
    </LeftSizesProvider>
    </BarsSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";