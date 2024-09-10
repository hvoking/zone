// App imports
import { FrontBlocks } from './front';
import { SideBlocks } from './side';
import './styles.scss';

// Context imports
import { useBuildingApi } from '../../../context/api/parcel/building';
import { useModuleDimensions } from '../../../context/filters/dimensions/module';

// Third-party imports
import * as d3 from 'd3';

export const Elevation = () => {
	const { buildingData } = useBuildingApi();
	const { apartmentFront, apartmentSide } = useModuleDimensions();

	if (!buildingData) return <></>

	const frontBlocks = buildingData.front_blocks;
	const sideBlocks = buildingData.side_blocks;

	const maxHeight: any = d3.max(Object.keys(frontBlocks));

	const maxFrontBlocks: any = d3.max(Object.values(frontBlocks));
	const maxSideBlocks: any = d3.max(Object.values(sideBlocks));

	const maxFrontLength = apartmentFront * maxFrontBlocks;
	const maxSideLength = apartmentSide * maxSideBlocks;

	const maxLength = d3.max([maxFrontLength, maxSideLength, maxHeight]);

	return (
		<div className="blocks-wrapper">
			<FrontBlocks
				frontBlocks={frontBlocks}
				maxLength={maxLength}
			/>
			<SideBlocks
				sideBlocks={sideBlocks}
				maxLength={maxLength}
			/>
		</div>
	)
}

Elevation.displayName="Elevation";