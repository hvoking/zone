import { ApartmentSlidersSizesProvider } from './sliders';
import { ApartmentBlockSizesProvider } from './block'

export const ApartmentSizesProvider = ({ children }: any) => {
	return (
		<ApartmentSlidersSizesProvider>
		<ApartmentBlockSizesProvider>
			{ children }
		</ApartmentBlockSizesProvider>
		</ApartmentSlidersSizesProvider>
	)
}

ApartmentSizesProvider.displayName="ApartmentSizesProvider";