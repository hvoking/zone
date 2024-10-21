// App imports
import { ParcelDimensionsProvider } from './parcel';
import { BuiltDimensionsProvider } from './built';

export const DimensionsProvider = ({ children }: any) => {
	return (
		<ParcelDimensionsProvider>
		<BuiltDimensionsProvider>
			{children}
		</BuiltDimensionsProvider>
		</ParcelDimensionsProvider>
	)
}

DimensionsProvider.displayName="DimensionsProvider";