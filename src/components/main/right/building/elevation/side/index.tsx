// App imports
import { SVGWrapper } from './svg';

// Context imports
import { useModuleDimensions } from '../../../../../context/filters/dimensions/module';
import { useSideElevationSizes } from '../../../../../context/sizes/right/elevation/side';
import { useStyleSheet } from '../../../../../context/filters/stylesheet';

// Third-party imports
import * as d3 from 'd3';

export const SideBlocks = ({ sideBlocks, maxLength }: any) => {
	const { apartmentSide } = useModuleDimensions();
	const { innerWidth, innerHeight } = useSideElevationSizes();
	const { linesColor, linesWidth, fillColor } = useStyleSheet();

	const xScale = d3.scaleLinear()
		.domain([0, maxLength])
		.range([0, innerWidth])

	const yScale = d3.scaleLinear()
		.domain([0, maxLength])
		.range([0, innerHeight])

	return (
		<SVGWrapper>
		  {Object.entries(sideBlocks).map(([item, count]: any, index: number) => {
		    const lastHeight: any = index > 0 ? Object.keys(sideBlocks)[index - 1] : 0;
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
			    		stroke="rgba(126, 126, 132, 1)"
			    		strokeWidth={0.6}
			    		strokeDasharray="3 6"
			    	/>
					<g transform={`translate(${innerWidth / 2 - xScale(count * apartmentSide) / 2}, 0)`}>
				        {Array.from({ length: count }, (_, i) => (
				          <rect 
				            key={i} 
				            x={xScale(i * apartmentSide)}
				            y={innerHeight - yScale(item)}
				            width={xScale(apartmentSide)}
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

SideBlocks.displayName="SideBlocks";