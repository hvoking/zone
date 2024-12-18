// App imports
import { Building } from './building';
import { Zone } from './zone';
import { Site } from './site';
import './styles.scss';

export const Right = () => {
  return (
    <div className="right-wrapper">
      <div className="right-items-wrapper">
        <Zone/>
        <Site/>
        <Building/>
      </div>
    </div>
  )
}

Right.displayName="Right";