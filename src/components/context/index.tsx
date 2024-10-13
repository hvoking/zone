// Context imports
import { MapsProvider } from './maps';
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';
import { ApiProvider } from './api';
import { StylesProvider } from './styles';

export const MainProvider = ({ children }: any) => {
	return (
		<FiltersProvider>
		<ApiProvider>
		<SizesProvider>
		<MapsProvider>
		<StylesProvider>
			{children}
		</StylesProvider>
		</MapsProvider>
		</SizesProvider>
		</ApiProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";