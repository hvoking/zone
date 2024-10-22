// Context imports
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';
import { ApiProvider } from './api';
import { StylesProvider } from './styles';
import { AreasProvider } from './areas';
import { CircleProvider } from './circle';
import { LayersProvider } from './layers';
import { EventsProvider } from './events';
import { MaskProvider } from './mask';

export const MainProvider = ({ children }: any) => {
	return (
		<FiltersProvider>
		<AreasProvider>
		<CircleProvider>
		<ApiProvider>
		<SizesProvider>
		<LayersProvider>
		<EventsProvider>
		<MaskProvider>
		<StylesProvider>
			{children}
		</StylesProvider>
		</MaskProvider>
		</EventsProvider>
		</LayersProvider>
		</SizesProvider>
		</ApiProvider>
		</CircleProvider>
		</AreasProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";