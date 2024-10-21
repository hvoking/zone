// App imports
import { Basemaps } from './basemaps';
import { Selectors } from './selectors';
import './styles.scss';

export const Wrapper = ({ children }: any) => {
	return (
		<div className="map-wrapper">
			{children}
			<Basemaps/>
			<Selectors/>
		</div>
	)
}

Wrapper.displayName="Wrapper";