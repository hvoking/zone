// Context imports
import { useVectors } from '../../../../../context/filters/vectors';
import { useStyleSheet } from '../../../../../context/filters/stylesheet';

export const Block = ({ xBottom, yBottom, xScale, yScale, item, apartmentSide, apartmentFront }: any) => {
	const { iLeft, jLeft, iRight, jRight } = useVectors();
	const { linesColor, linesWidth } = useStyleSheet();

	const xLeft = xBottom + iLeft * xScale(apartmentFront);
	const yLeft = yBottom  + jLeft * xScale(apartmentFront);
	const xRight = xBottom + iRight * xScale(apartmentSide);
	const yRight = yBottom + jRight * xScale(apartmentSide);
	const xProjected = xLeft + iRight * xScale(apartmentSide);
	const yProjected = yLeft + jRight * xScale(apartmentSide);

	const floorHeight = yScale(item)

	// Block with height of 1 floor
	const yTopLeft = yLeft - floorHeight;
	const yTopRight = yRight - floorHeight;
	const yTop = yProjected - floorHeight;

	const yInside = yBottom - floorHeight;

	return (
		<g>
			<polygon 
				fill={linesColor}
				stroke={linesColor} 
				strokeWidth={linesWidth}
				points={`
					${xBottom}, ${yInside}
					${xRight}, ${yTopRight}
					${xProjected}, ${yTop}
					${xLeft}, ${yTopLeft}
				`}
			/>
			<polygon 
				fill="rgba(126, 126, 132, 0.9)"
				strokeWidth="0"
				points={`
					${xBottom}, ${yBottom}
					${xRight}, ${yRight}
					${xRight}, ${yTopRight}
					${xProjected}, ${yTop}
					${xLeft}, ${yTopLeft}
					${xLeft}, ${yLeft}
				`}
			/>
			<line 
				stroke={linesColor}
				strokeWidth={linesWidth}
				x1={xBottom} 
				y1={yBottom} 
				x2={xBottom} 
				y2={yInside}
			/>
		</g>
	)
}