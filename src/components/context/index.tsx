// Context imports
import { MapsProvider } from './maps';
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';
import { ApiProvider } from './api';
import { StylesProvider } from './styles';
import { DimensionsProvider } from './dimensions';
import { CircleProvider } from './circle';

export const MainProvider = ({ children }: any) => {
	return (
		<DimensionsProvider>
		<FiltersProvider>
		<CircleProvider>
		<ApiProvider>
		<SizesProvider>
		<MapsProvider>
		<StylesProvider>
			{children}
		</StylesProvider>
		</MapsProvider>
		</SizesProvider>
		</ApiProvider>
		</CircleProvider>
		</FiltersProvider>
		</DimensionsProvider>
	)
}

MainProvider.displayName="MainProvider";