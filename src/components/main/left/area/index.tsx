// React imports
import { useState } from 'react';

// App imports
import { Title } from './title';
import { Graphics } from './graphics';
import { Slider } from './slider';
import './styles.scss';

export const Area = () => {
	const [ activeForeground, setActiveForeground ] = useState(false);
	
	return (
		<div className="area-filter-wrapper">
			<Title/>
			<div className="area-filter">
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

Area.displayName="Area";