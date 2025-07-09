export const Foreground = ({ xScale, leftPosition, rightPosition, circleRadius, activeForeground }: any) => {
	return (
		<rect
			x={xScale(leftPosition)}
			y={circleRadius / 2}
			rx={circleRadius / 2}
			ry={circleRadius / 2}
			width={xScale(rightPosition) - xScale(leftPosition)}
			height={circleRadius}
			fill={
				activeForeground ? 
				"rgba(255, 255, 255, 0.5)" : 
				"rgba(255, 255, 255, 0.3)"
			}
		/>
	)
}

Foreground.displayName="Foreground";