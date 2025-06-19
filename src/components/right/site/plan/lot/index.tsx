// Context imports
import { useStyleSheet } from '../../../../../context/filters/stylesheet';

export const Lot = ({ path, currentLot, ocioso }: any) => {
	const { linesColor, linesWidth } = useStyleSheet();

	return (
		<path
			fill={ocioso == 1 ? "rgba(126, 126, 132, 0.2)" : "rgba(126, 126, 132, 0.2)"}
			stroke={linesColor} 
			strokeWidth={linesWidth}
			className="feature" 
			d={`${path(currentLot)}`}
		/>
	)
}

Lot.displayName="Lot";