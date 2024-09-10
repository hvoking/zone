// App imports
import { Block } from './block';
import { SVGWrapper } from './svg';
import { Dimensions } from './dimensions';
import { SideDimensions } from './sideDimensions';
import { Legend } from './legend';

// Context imports
import { useLayoutSizes } from '../../../context/sizes/right/layout';
import { useVectors } from '../../../context/filters/vectors';
import { useSiteApi } from '../../../context/api/parcel/site';
import { useBuildingApi } from '../../../context/api/parcel/building';

// Third-party imports
import * as d3 from 'd3';

export const Layout = ({ parcelData }: any) => {
	const { iRight, jRight, iLeft, jLeft} = useVectors();
	const { innerWidth, innerHeight } = useLayoutSizes();
	
	const { buildingData } = useBuildingApi();
	const { siteData } = useSiteApi();

	if (!siteData || !buildingData) return <></>

	const distRight = Math.round(siteData.side);
	const distLeft = Math.round(siteData.front);

	const rightWidth = Math.abs(iRight * distRight);
	const leftWidth = Math.abs(iLeft * distLeft);
	const objectWidth = rightWidth + leftWidth;

	const rightHeight = Math.abs(jRight * distRight);
	const leftHeight = Math.abs(jLeft * distLeft);
	const objectHeight = rightHeight + leftHeight;

	const screenSize: any = d3.min([innerWidth, innerHeight]); 
	const parcelSize: any = d3.max([objectWidth, objectHeight]);

	const linearScale = d3.scaleLinear()
		.domain([0, parcelSize])
		.range([0, screenSize]);

	const xBottom = linearScale(leftWidth) + innerWidth / 2 - linearScale(objectWidth / 2);
	const yBottom = innerHeight / 2 + linearScale(objectHeight / 2);

	const buildingTranslationFront = linearScale((distLeft - buildingData.front_blocks_length) / 2);

	return (
		<SVGWrapper>
			{/*Lot*/}
			<Block 
				xBottom={xBottom} 
				yBottom={yBottom}
				distLeft={linearScale(distLeft)}
				distRight={linearScale(distRight)}
			/>
			{/*Building*/}
			<Block 
				xBottom={xBottom + iRight * 4 + buildingTranslationFront * iLeft} 
				yBottom={yBottom + jRight * 4 + buildingTranslationFront * jLeft}
				distLeft={linearScale(buildingData.front_blocks_length)}
				distRight={linearScale(buildingData.side_blocks_length)}
			/>
			<Dimensions
				xScale={linearScale} 
				xBottom={xBottom}
				yBottom={yBottom}
				distLeft={distLeft}
			/>
			<SideDimensions
				xScale={linearScale} 
				xBottom={xBottom}
				yBottom={yBottom}
				distLeft={distRight}
			/>
			<Legend innerHeight={innerHeight}/>
		</SVGWrapper>
	)
}

Layout.displayName="Layout";