// App imports
import { SVGWrapper } from './svg';
import { Lot } from './lot'
import { North } from './north';
import { Curves } from './curves';
import { Legend } from './legend';

// Context imports
import { useSiteApi } from 'context/api/site';
import { useParcelSizes } from 'context/sizes/right/parcel';

// Third-party imports
import * as d3 from 'd3';

export const Plan = () => {
	const { innerWidth, innerHeight } = useParcelSizes();
	const { envelopData, siteData } = useSiteApi();

	const { ocioso } = siteData;

	const projection = d3.geoIdentity()
		.reflectY(true)
		.fitSize([ innerWidth, innerHeight ], envelopData)

	const path = d3.geoPath(projection);

	return (
		<SVGWrapper>
			<North/>
			<Lot path={path} currentLot={envelopData} ocioso={ocioso}/>
			<Curves path={path}/>
			<Legend innerHeight={innerHeight}/>
		</SVGWrapper>
	)
}

Plan.displayName="Plan";