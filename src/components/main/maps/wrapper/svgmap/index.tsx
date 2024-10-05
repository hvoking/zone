// React imports
import { useRef } from 'react';

// App imports
import { SVGWrapper } from './svg';
import './styles.scss';

// Context imports
import { useGeo } from '../../../../context/filters/geo';
import { usePolygonApi } from '../../../../context/api/polygon';
import { useCircleDimensions } from '../../../../context/filters/dimensions/circle';
import { useStyleSheet } from '../../../../context/filters/stylesheet';
import { useSVGMapSizes } from '../../../../context/sizes/maps/svgMap';

// Third-party imports
import * as d3 from 'd3';

export const SVGMap = () => {
	const { polygonData } = usePolygonApi();
	const { circleGeometry } = useCircleDimensions();
	const { innerWidth, innerHeight } = useSVGMapSizes();const { setPlaceCoordinates } = useGeo();
	const { lineColor, lineWidth, fillColor } = useStyleSheet();
	const svgContainerRef = useRef<any>(null);

	if (!circleGeometry || !polygonData || !polygonData[0].city_geom) return (<></>)

	const city = polygonData[0].city_geom[0];
	const polygon = circleGeometry.features[0].geometry;	

	const projection = d3.geoIdentity()
		.reflectY(true)
		.fitSize([ innerWidth, innerHeight ], city)

	const path = d3.geoPath(projection);

	const onClick = (e: any) => {
		const rect = svgContainerRef.current.getBoundingClientRect();
		const adjustedCoordinates: any = [e.clientX - rect.left, e.clientY - rect.top];
	    const [lng, lat]: any = projection.invert(adjustedCoordinates);
	    setPlaceCoordinates({ latitude: lat, longitude: lng });
	}

	return (
		<div className="svg-map-wrapper">
			<div ref={svgContainerRef} className="svg-map">
				<SVGWrapper>
					<path
						onClick={onClick}
						fill={fillColor}
						stroke={lineColor}
						strokeWidth={lineWidth}
						d={`${path(city)}`}
					/>
					<path
						fill="rgba(255, 0, 0, 1)"
						stroke="rgba(255, 0, 0, 1)"
						strokeWidth={0.6}
						className="feature" 
						d={`${path(polygon)}`}
					/>
				</SVGWrapper>
			</div>
		</div>
	)
}

SVGMap.displayName="SVGMap";