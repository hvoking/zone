// App imports
import './styles.scss';

export const Logo = () => {
	return (
		<div className="logo-wrapper">
			<img 
				src={process.env.PUBLIC_URL + "/static/logos/logo.svg"} 
				alt="logo" 
				height="40px"
			/>
		</div>
	)
}

Logo.displayName="Logo";