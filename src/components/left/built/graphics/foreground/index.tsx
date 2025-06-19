export const Foreground = ({ xScale, innerHeight, leftPosition, rightPosition, activeForeground }: any) => {
	return (
		<rect
			x={xScale(leftPosition)}
			width={xScale(rightPosition) - xScale(leftPosition)}
			height={innerHeight}
			fill={
				activeForeground ? 
				"rgba(126, 126, 132, 0.2)" : 
				"none"
			}
		/>
	)
}

Foreground.displayName="Foreground";