// App imports
import './styles.scss';

// Context imports
import { useVectors } from 'context/filters/vectors';
import { useStyleSheet } from 'context/filters/stylesheet';

export const Block = ({ xBottom, yBottom, distRight, distLeft }: any) => {
	const { linesColor, linesWidth, fillColor } = useStyleSheet();
	const { iRight, jRight, iLeft, jLeft } = useVectors();

	const xRight =  xBottom + iRight * distRight;
	const yRight = yBottom + jRight * distRight;

	const xLeft = xBottom + iLeft * distLeft;
	const yLeft = yBottom + jLeft * distLeft;

	const xTop = xLeft + iRight * distRight;
	const yTop = yLeft + jRight * distRight;

	return (
		<polygon 
			fill={fillColor}
			stroke={linesColor} 
			strokeWidth={linesWidth}
			points={`
				${xBottom}, ${yBottom}
				${xRight}, ${yRight} 
				${xTop}, ${yTop}
				${xLeft}, ${yLeft}
			`}
		/>
	)
}

Block.displayName="Block";