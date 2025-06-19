// App imports
import { ConstructionSliderSizesProvider } from './construction';
import { ParcelSliderSizesProvider } from './parcel';

export const SliderSizesProvider = ({children}: any) => {
  return (
    <ParcelSliderSizesProvider>
    <ConstructionSliderSizesProvider>
      {children}
    </ConstructionSliderSizesProvider>
    </ParcelSliderSizesProvider>
  )
}

SliderSizesProvider.displayName="SliderSizesProvider";