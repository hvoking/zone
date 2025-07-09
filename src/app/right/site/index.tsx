// App imports
import { Plan } from './plan';
import { Layout } from './layout';
import './styles.scss';

export const Site = () => {
	return (
			<div className="site-wrapper">
				<div className="title-wrapper-style">
					Selected parcel
				</div>
				<div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
					<Plan/>
					<Layout/>
				</div>
			</div>
	)
}

Site.displayName="Site";