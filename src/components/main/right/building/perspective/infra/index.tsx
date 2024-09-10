// App imports
import { Plane } from './plane';
import { Sobresolo } from './sobresolo';
import { Subsolo } from './subsolo';

export const Infra = ({ xRight, yRight, xLeft, yLeft, xBottom, yBottom, xProjected, yProjected, floorHeight }: any) => {
	return (
			<>
				<Subsolo
					xBottom={xBottom} 
					yBottom={yBottom} 
					xLeft={xLeft} 
					yLeft={yLeft}
					xRight={xRight} 
					yRight={yRight} 
					xProjected={xProjected} 
					yProjected={yProjected} 
					floorHeight={floorHeight}
				/>
				<Plane 
					xBottom={xBottom} 
					yBottom={yBottom} 
					xLeft={xLeft} 
					yLeft={yLeft} 
					xRight={xRight} 
					yRight={yRight} 
					xProjected={xProjected} 
					yProjected={yProjected}
				/>
				<Sobresolo 
					xBottom={xBottom} 
					yBottom={yBottom} 
					xLeft={xLeft} 
					yLeft={yLeft} 
					xRight={xRight} 
					yRight={yRight} 
					xProjected={xProjected} 
					yProjected={yProjected} 
					floorHeight={floorHeight}
				/>
			</>
			
	)
}

Infra.displayName="Infra";