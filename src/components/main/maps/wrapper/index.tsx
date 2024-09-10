// App imports
import { SVGMap } from './svgmap';
import { Location } from './location';
import { BasemapsSelectors } from './basemaps';
import { Selectors } from './selectors';
import './styles.scss';

export const Wrapper = ({ children }: any) => {
	return (
		<div className="map-wrapper">
			{children}
			<SVGMap/>
			<BasemapsSelectors/>
			<Selectors/>
			<Location/>
		</div>
	)
}

Wrapper.displayName="Wrapper";