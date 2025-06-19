import { StylesProvider } from './styles';
import { LayersProvider } from './layers';
import { EventsProvider } from './events';
import { MaskProvider } from './mask';

export const MapsProvider = ({ children }: any) => {
	return (
		<LayersProvider>
		<EventsProvider>
		<MaskProvider>
		<StylesProvider>
			{children}
		</StylesProvider>
		</MaskProvider>
		</EventsProvider>
		</LayersProvider>
	)
}

MapsProvider.displayName="MapsProvider";