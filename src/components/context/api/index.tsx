// App imports
import { BuildingApiProvider } from './building';
import { SiteApiProvider } from './site';
import { ZoneApiProvider } from './zone';
import { EnvelopApiProvider } from './envelop';
import { TrimApiProvider } from './trim';

export const ApiProvider = ({children}: any) => {
  return (
    <TrimApiProvider>
    <SiteApiProvider>
    <EnvelopApiProvider>
    <ZoneApiProvider>
    <BuildingApiProvider>
      {children}
    </BuildingApiProvider>
    </ZoneApiProvider>
    </EnvelopApiProvider>
    </SiteApiProvider>
    </TrimApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";