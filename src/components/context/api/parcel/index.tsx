// App imports
import { BuildingApiProvider } from './building';
import { SiteApiProvider } from './site';
import { ZoneApiProvider } from './zone';
import { EnvelopApiProvider } from './envelop';

export const ParcelApiProvider = ({ children }: any) => {
	return (
		<SiteApiProvider>
		<EnvelopApiProvider>
		<ZoneApiProvider>
		<BuildingApiProvider>
			{children}
		</BuildingApiProvider>
		</ZoneApiProvider>
		</EnvelopApiProvider>
		</SiteApiProvider>
	)
}

ParcelApiProvider.displayName="ParcelApiProvider";