export const Foreground = ({ activeForeground, xScale, minBound, radiusPosition, circleRadius }: any) => {
	return (
		<rect
			x={xScale(minBound)}
			y={circleRadius / 2}
			rx={circleRadius / 2}
			ry={circleRadius / 2}
			width={xScale(radiusPosition) - xScale(minBound)}
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