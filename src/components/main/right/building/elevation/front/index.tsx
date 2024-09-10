// App imports
import { SVGWrapper } from './svg';

// Context imports
import { useModuleDimensions } from '../../../../context/filters/dimensions/module';
import { useFrontElevationSizes } from '../../../../context/sizes/right/elevation/front';
import { useStyleSheet } from '../../../../context/filters/stylesheet';

// Third-party imports
import * as d3 from 'd3';

export const FrontBlocks = ({ frontBlocks, maxLength }: any) => {
	const { apartmentFront } = useModuleDimensions();
	const { innerHeight, innerWidth } = useFrontElevationSizes();
	const { linesColor, linesWidth, fillColor } = useStyleSheet();

	const xScale = d3.scaleLinear()
		.domain([0, maxLength])
		.range([0, innerWidth])

	const yScale = d3.scaleLinear()
		.domain([0, maxLength])
		.range([0, innerHeight])

	return (
		<SVGWrapper>
		  {Object.entries(frontBlocks).map(([item, count]: any, index: number) => {
		    const lastHeight: any = index > 0 ? Object.keys(frontBlocks)[index - 1] : 0;
		    return (
		    	<g key={index}>
		    		<text
		    			x={-10}
		    			y={innerHeight - yScale(item)}
		    			alignmentBaseline="middle"
		    			textAnchor="start"
		    			fill="rgba(126, 126, 132, 1)"
		    			fontSize="0.8em"
		    		>
		    			{item}
		    		</text>
		    		<line
		    			x1={10}
		    			y1={innerHeight - yScale(item)}
		    			x2={innerWidth / 2}
		    			y2={innerHeight - yScale(item)}
		    			stroke={linesColor}
		    			strokeWidth={0.6}
		    			strokeDasharray="3 6"
		    		/>
					<g transform={`translate(${innerWidth / 2 - xScale(count * apartmentFront) / 2}, 0)`}>
						{Array.from({ length: count }, (_, i) => (
						  <rect 
						    key={i} 
						    x={xScale(i * apartmentFront)}
						    y={innerHeight - yScale(item)}
						    width={xScale(apartmentFront)}
						    height={yScale(item - lastHeight)}
						    fill={fillColor}
						    stroke={linesColor}
						    strokeWidth={linesWidth}
						  />
						))}
					</g>
		      </g>
		    );
		  })}
		</SVGWrapper>
	)
}

FrontBlocks.displayName="FrontBlocks";