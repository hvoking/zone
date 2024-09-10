export const Subsolo = ({ xBottom, yBottom, xLeft, yLeft, xRight, yRight, xProjected, yProjected, floorHeight }: any) => {
	return (
		<polygon 
			fill="rgba(126, 126, 132, 1)"
			stroke="rgba(255, 0, 0, 1)"
			strokeDasharray="12"
			points={`
				${xBottom},${yBottom + floorHeight} 
				${xRight},${yRight + floorHeight} 
				${xRight},${yRight} 
				${xProjected},${yProjected} 
				${xLeft},${yLeft} 
				${xLeft},${yLeft + floorHeight}
			`}
		/>
	)
}

Subsolo.displayName="Subsolo"