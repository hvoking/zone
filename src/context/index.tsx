// Context imports
import { GeoProvider } from './geo';
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';
import { ApiProvider } from './api';
import { MapsProvider } from './maps';

export const ContextProvider = ({ children }: any) => {
	return (
		<GeoProvider>
		<FiltersProvider>
		<ApiProvider>
		<MapsProvider>
		<SizesProvider>
			{children}
		</SizesProvider>
		</MapsProvider>
		</ApiProvider>
		</FiltersProvider>
		</GeoProvider>
	)
}

ContextProvider.displayName="ContextProvider";