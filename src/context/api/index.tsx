// App imports
import { BuildingApiProvider } from './building';
import { SiteApiProvider } from './site';
import { TrimApiProvider } from './trim';

export const ApiProvider = ({children}: any) => {
  return (
    <TrimApiProvider>
    <SiteApiProvider>
    <BuildingApiProvider>
      {children}
    </BuildingApiProvider>
    </SiteApiProvider>
    </TrimApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";