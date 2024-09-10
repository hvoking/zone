// App imports
import { ParcelDimensionsProvider } from './parcel';
import { ModuleDimensionsProvider } from './module';
import { BuiltDimensionsProvider } from './built';
import { CircleDimensionsProvider } from './circle';

export const DimensionsProvider = ({ children }: any) => {
	return (
		<ParcelDimensionsProvider>
		<BuiltDimensionsProvider>
		<ModuleDimensionsProvider>
		<CircleDimensionsProvider>
			{children}
		</CircleDimensionsProvider>
		</ModuleDimensionsProvider>
		</BuiltDimensionsProvider>
		</ParcelDimensionsProvider>
	)
}

DimensionsProvider.displayName="DimensionsProvider";