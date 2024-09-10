// App imports
import { SliderSizesProvider } from './slider';
import { BarsSizesProvider } from './bars';
import { CircleSizesProvider } from './circle';
import { RadiusSizesProvider } from './radius';

export const LeftSizesProvider = ({children}: any) => {
  return (
    <CircleSizesProvider>
    <SliderSizesProvider>
    <BarsSizesProvider>
    <RadiusSizesProvider>
      {children}
    </RadiusSizesProvider>
    </BarsSizesProvider>
    </SliderSizesProvider>
    </CircleSizesProvider>
  )
}

LeftSizesProvider.displayName="LeftSizesProvider";