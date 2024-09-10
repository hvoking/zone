export const Legend = ({ innerHeight }: any) => {
	return (
		<text
			x={0}
			y={innerHeight}
			fill="rgba(255, 255, 255, 0.6)"
			fontSize="0.8em"
			alignmentBaseline="after-edge"
		>
			site plan
		</text>
	)
}

Legend.displayName="Legend";