// App imports
import { SVGWrapper } from './svg';
import { Infra } from './infra';
import { Block } from './block';

// Context imports
import { usePerspectiveSizes } from '../../../../context/sizes/right/perspective';
import { useVectors } from '../../../../context/filters/vectors';
import { useBuilding } from '../../../../context/filters/building';
import { useBuildingApi } from '../../../../context/api/parcel/building';
import { useModuleDimensions } from '../../../../context/filters/dimensions/module';

// Third-party imports
import * as d3 from 'd3';

export const Perspective = () => {
	const { innerWidth, innerHeight } = usePerspectiveSizes();
	const { iLeft, jLeft, iRight, jRight } = useVectors();
	const { undergroundHeight } = useBuilding();
	const { buildingData } = useBuildingApi();
	const { apartmentFront, apartmentSide } = useModuleDimensions();

	if (!buildingData) return <></>

	const frontBlocks = buildingData.front_blocks;
	const sideBlocks = buildingData.side_blocks;

	const sideLength = buildingData.side_blocks_length;
	const frontLength = buildingData.front_blocks_length;

	const rightWidth = Math.abs(iRight * sideLength);
	const leftWidth = Math.abs(iLeft * frontLength);
	const objectWidth = rightWidth + leftWidth;

	const xScale = d3.scaleLinear()
		.domain([0, objectWidth])
		.range([0, innerWidth]);

	const xBottom = xScale(leftWidth) + innerWidth / 2 - xScale(objectWidth / 2);
	const yBottom = innerHeight;

	const xLeft = xBottom + iLeft * xScale(frontLength);
	const yLeft = yBottom  + jLeft * xScale(frontLength);

	const xProjected = xLeft + iRight * xScale(sideLength);
	const yProjected = yLeft + jRight * xScale(sideLength);

	const xRight = xBottom + iRight * xScale(sideLength);
	const yRight = yBottom + jRight * xScale(sideLength);

	const objectHeight = jRight * xScale(sideLength) + jLeft * xScale(frontLength);

	const buildingHeight: any = d3.max(Object.keys(frontBlocks));

	const yScale = d3.scaleLinear()
		.domain([0, parseInt(buildingHeight) + undergroundHeight * 2])
		.range([0, innerHeight + objectHeight])

	const renderBlocks = () => {
	    return Object.keys(buildingData.front_blocks).map((item: any, index: number) => {
	        const frontCount = frontBlocks[item];
	        const sideCount = sideBlocks[item];

	        const frontBlocksArray = Array.from({ length: frontCount }, (_, i) => i);
	        const sideBlocksArray = Array.from({ length: sideCount }, (_, j) => j);

	        const frontOffset = (frontLength - frontCount * apartmentFront) / 2;
			const sideOffset = (sideLength - sideCount * apartmentSide) / 2;
			
	        return (
	            <g key={index} transform={`translate(
					${iRight * xScale(sideOffset) + iLeft * xScale(frontOffset)}, 
					${jRight * xScale(sideOffset) + jLeft * xScale(frontOffset)}
				)`}>
	                {frontBlocksArray.reverse().map((i) => {
	                    const dispXLeft = iLeft * xScale(i * apartmentFront);
	                    const dispYLeft = jLeft * xScale(i * apartmentFront);
	                    const lastHeight: any = index > 0 ? Object.keys(frontBlocks)[index - 1] : 0;
	                    return (
	                    	<g key={i}>
		                        <g transform={`translate(0, ${-yScale(lastHeight)})`}>
		                            {sideBlocksArray.reverse().map((j) => {
		                                const dispXRight = iRight * xScale((j * apartmentSide))
		                                const dispYRight = jRight * xScale((j * apartmentSide))

		                                const currentXBottom = xBottom + dispXLeft + dispXRight;
		                                const currentYBottom = yBottom + dispYLeft + dispYRight;

		                                return (
		                                    <Block
		                                        key={`${i}-${j}`}
		                                        xBottom={currentXBottom}
		                                        yBottom={currentYBottom}
		                                        xScale={xScale}
		                                        yScale={yScale}
		                                        item={item - lastHeight}
		                                    />
		                                )
		                            })}
		                        </g>
		                        <g transform={`translate(
									${-(iRight * xScale(sideOffset) + iLeft * xScale(frontOffset))}, 
									${jRight * xScale(frontCount * apartmentFront)}
								)`}>
			                        <text
			                        	x={-20}
			                        	y={innerHeight - yScale(item)}
			                        	alignmentBaseline="middle"
			                        	textAnchor="start"
			                        	fill="rgba(126, 126, 132, 1)"
			                        	fontSize="0.8em"
			                        >
			                        	{item}
			                        </text>
			                        <line
			                        	x1={0}
			                        	y1={innerHeight - yScale(item)}
			                        	x2={innerWidth - 20}
			                        	y2={innerHeight - yScale(item)}
			                        	stroke="rgba(126, 126, 132, 0.8)"
			                        	strokeWidth={0.6}
			                        	strokeDasharray="3 6"
			                        />
		                        </g>
	                        </g>
	                    )
	                })}
	            </g>
	        )
	    });
	};

	return (
		<SVGWrapper>
			<g transform={`translate(0, ${yScale(-undergroundHeight)})`}>
				<Infra
					xBottom={xBottom}
					yBottom={yBottom}
					xRight={xRight}
					yRight={yRight}
					xLeft={xLeft}
					yLeft={yLeft}
					xProjected={xProjected}
					yProjected={yProjected}
					floorHeight={yScale(undergroundHeight)}
				/>
				<g transform={`translate(0, ${yScale(-undergroundHeight)})`}>
					{renderBlocks()}
				</g>
			</g>
		</SVGWrapper>
	)
}

Perspective.displayName="Perspective";