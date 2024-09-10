// Context imports
import { MapsProvider } from './maps';
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';
import { ApiProvider } from './api';

export const MainProvider = ({ children }: any) => {
	return (
		<FiltersProvider>
		<ApiProvider>
		<SizesProvider>
		<MapsProvider>
			{children}
		</MapsProvider>
		</SizesProvider>
		</ApiProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";