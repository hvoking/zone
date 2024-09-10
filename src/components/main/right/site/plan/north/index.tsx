export const North = () => {
	return (
		<g>
			<polygon 
				stroke="rgba(126, 126, 132, 1)"
				strokeWidth={0.6}
				points= {`
					0, 23
					7, 16
					7, 5
				`}
			/>
			<polygon 
				fill="rgba(126, 126, 126, 1)"
				stroke="rgba(126, 126, 132, 1)"
				strokeWidth={0.6}
				points= {`
					14, 23
					7, 16
					7, 5
				`}
			/>
			<text
				x={7}
				y={28}
				fill="rgba(126, 126, 132, 1)"
				fontSize="0.6em"
				alignmentBaseline="middle"
				textAnchor="middle"
			>
				N
			</text>
		</g>
	)
}

North.displayName="North";