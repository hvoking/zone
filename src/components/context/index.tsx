// Context imports
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';
import { ApiProvider } from './api';
import { MapsProvider } from './maps';

export const MainProvider = ({ children }: any) => {
	return (
		<FiltersProvider>
		<ApiProvider>
		<MapsProvider>
		<SizesProvider>
			{children}
		</SizesProvider>
		</MapsProvider>
		</ApiProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";