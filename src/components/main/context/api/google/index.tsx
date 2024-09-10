// App imports
import { GoogleReverseApiProvider } from './reverse';
import { GoogleSearchApiProvider } from './search';
import { GoogleDetailsApiProvider } from './details';

export const GoogleApiProvider = ({children}: any) => {
  return (
    <GoogleReverseApiProvider>
    <GoogleSearchApiProvider>
    <GoogleDetailsApiProvider>
      {children}
    </GoogleDetailsApiProvider>
    </GoogleSearchApiProvider>
    </GoogleReverseApiProvider>
  )
}

GoogleApiProvider.displayName="GoogleApiProvider";