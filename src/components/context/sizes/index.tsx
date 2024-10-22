// App imports
import { LeftSizesProvider } from './left';
import { RightSizesProvider } from './right';
import { BarsSizesProvider } from './bars';
import { SliderSizesProvider } from './slider';

export const SizesProvider = ({children}: any) => {
  return (
    <BarsSizesProvider>
    <LeftSizesProvider>
    <RightSizesProvider>
    <SliderSizesProvider>
      {children}
    </SliderSizesProvider>
    </RightSizesProvider>
    </LeftSizesProvider>
    </BarsSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";