// App imports
import './styles.scss';

export const Logo = () => {
	return (
		<div className="logo-wrapper">
			<img 
				className="logo"
				src={process.env.PUBLIC_URL + "/static/logos/white.svg"} 
				alt="header-logo"
			/>
			<div className="logo-name">
				Spatial Fingers
			</div>
		</div>
	)
}

Logo.displayName="Logo";