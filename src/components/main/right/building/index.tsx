// App imports
import { Title } from './title';
import { Elevation } from './elevation';
import { Perspective } from './perspective';
import './styles.scss';

export const Building = () => {
	return (
		<div className="mass-wrapper">
			<Title/>
			<div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
				<Elevation/>
				<Perspective/>
			</div>
		</div>
	)
}

Building.displayName="Building";