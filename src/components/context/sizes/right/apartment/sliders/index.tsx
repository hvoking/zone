// App imports
import { FrontSliderSizesProvider } from './front';
import { SideSliderSizesProvider } from './side';
import { HeightSliderSizesProvider } from './height';

export const ApartmentSlidersSizesProvider = ({children}: any) => {
  return (
    <FrontSliderSizesProvider>
    <HeightSliderSizesProvider>
    <SideSliderSizesProvider>
      {children}
    </SideSliderSizesProvider>
    </HeightSliderSizesProvider>
    </FrontSliderSizesProvider>
  )
}

ApartmentSlidersSizesProvider.displayName="ApartmentSlidersSizesProvider";