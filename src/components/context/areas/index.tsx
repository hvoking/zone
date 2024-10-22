// App imports
import { ParcelAreasProvider } from './parcel';
import { BuiltAreasProvider } from './built';

export const AreasProvider = ({ children }: any) => {
	return (
		<ParcelAreasProvider>
		<BuiltAreasProvider>
			{children}
		</BuiltAreasProvider>
		</ParcelAreasProvider>
	)
}

AreasProvider.displayName="AreasProvider";