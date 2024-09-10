// React imports
import { useState } from 'react';

// App imports
import { Logo } from './logo';
import { Search } from './search';
import { BackArrow } from './arrow';
import './styles.scss';

export const Header = () => {
	const [ activeSearch, setActiveSearch ] = useState(false);

	return (
		<div className="wrapper-header">
			<div className="normal-header">
				<Logo/>
			</div>
			<div className="small-header">
				{
					!activeSearch ? 
					<Logo/> : 
					<BackArrow setActiveSearch={setActiveSearch}/>
				}
			</div>
			<Search 
				activeSearch={activeSearch} 
				setActiveSearch={setActiveSearch}
			/>
		</div>
	)
}

Header.displayName="Header"