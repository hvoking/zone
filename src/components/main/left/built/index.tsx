// React imports
import { useState } from 'react';

// App imports
import { Title } from './title';
import { Graphics } from './graphics';
import { Slider } from './slider';
import './styles.scss';

export const Built = () => {
	const [ activeForeground, setActiveForeground ] = useState(false);
	
	return (
		<div className="built-filter-wrapper">
			<Title/>
			<div className="built-filter">
				<Graphics 
					activeForeground={activeForeground} 
					setActiveForeground={setActiveForeground}
				/>
				<div style={{transform: "translateY(-8px)"}}>
					<Slider
						activeForeground={activeForeground} 
						setActiveForeground={setActiveForeground}
					/>
				</div>
			</div>
		</div>
	)
}

Built.displayName="Built";