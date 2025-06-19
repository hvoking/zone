export const Plane = ({ xRight, yRight, xLeft, yLeft, xBottom, yBottom, xProjected, yProjected }: any) => {
	return (
		<polygon 
			opacity={0.3}
			fill="rgba(51, 102, 102, 1)"
			points={`
				${xBottom},${yBottom}
				${xRight},${yRight}
				${xProjected},${yProjected}
				${xLeft},${yLeft}
			`
		}/>
	)
}

Plane.displayName="Plane"