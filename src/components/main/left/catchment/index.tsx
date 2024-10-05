// App imports
import { SVGWrapper } from './svg';
import { Title } from './title';
import { Slider } from './slider';
import './styles.scss';

// Context imports
import { useCircleDimensions } from '../../../context/filters/dimensions/circle';
import { useStyleSheet } from '../../../context/filters/stylesheet';
import { useCircleSizes } from '../../../context/sizes/left/circle';

// Third-party imports
import * as d3 from 'd3';

export const Catchment = ({ polygonArea, polygon }: any) => {
	const { innerWidth, innerHeight } = useCircleSizes();
	const { maxBound, radiusPosition } = useCircleDimensions();
	const { fillColor } = useStyleSheet();

	const r: any = d3.min([innerWidth / 2, innerHeight / 2])

	const xScale = d3.scaleLinear()
		.domain([1, (maxBound * 2) * 1000])
		.range([1, r * 2])
	
	return (
			<div className="catchment-wrapper">
				<Title/>
				<div className="circle-wrapper">
					<SVGWrapper>
						<circle
							cx={innerWidth / 2}
							cy={ innerHeight / 2}
							r={xScale(radiusPosition * 1000)}
							fill={fillColor}
						/>
					</SVGWrapper>
					<div className="distance-info">
						<div>
							<div>
								{(Math.round(radiusPosition * 100 * 10) / 10).toFixed(1)}
								<span style={{fontSize: "0.8em"}}> km</span>
							</div>

							<div className="subtitle-style">radius</div>
						</div>
						<div>
							<div>
								{Math.round(radiusPosition * 100 * 12)}
								<span style={{fontSize: "0.8em"}}> min</span>
							</div>
							<div className="subtitle-style">walk time</div>
						</div>
					</div>
				</div>
				<Slider/>
			</div>
	)
}

Catchment.displayName="Catchment";