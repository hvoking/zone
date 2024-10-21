// App imports
import { ParcelDimensionsProvider } from './parcel';
import { ModuleDimensionsProvider } from './module';
import { BuiltDimensionsProvider } from './built';

export const DimensionsProvider = ({ children }: any) => {
	return (
		<ParcelDimensionsProvider>
		<BuiltDimensionsProvider>
		<ModuleDimensionsProvider>
			{children}
		</ModuleDimensionsProvider>
		</BuiltDimensionsProvider>
		</ParcelDimensionsProvider>
	)
}

DimensionsProvider.displayName="DimensionsProvider";