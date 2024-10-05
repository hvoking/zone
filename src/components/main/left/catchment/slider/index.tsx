// React imports
import { useState } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Background } from './background';
import { Foreground } from './foreground';
import { Handler } from './handler';
import { Legend } from './legend';
import { Wrapper } from './wrapper';

// Context imports
import { useCircleDimensions } from '../../../../context/filters/dimensions/circle';
import { useRadiusSizes } from '../../../../context/sizes/left/radius';

// Third-party imports
import * as d3 from 'd3';

export const Slider = () => {
  const [ activeForeground, setActiveForeground ] = useState(false);
  const { innerWidth, innerHeight } = useRadiusSizes();
  const { radiusPosition, setRadiusPosition, setCircleRadius, minBound, maxBound } = useCircleDimensions();

  const circleRadius = innerHeight / 6;
  const offset = 20;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offset, innerWidth - offset ]);

  return (
    <SVGWrapper>
      <Background
        xScale={xScale} 
        minBound={minBound} 
        maxBound={maxBound} 
        circleRadius={circleRadius}
      />
      <Foreground
        xScale={xScale} 
        minBound={minBound}
        radiusPosition={radiusPosition} 
        circleRadius={circleRadius}
        activeForeground={activeForeground}
      />
      <Handler
        activeForeground={activeForeground}
        cx={xScale(radiusPosition)} 
        cy={circleRadius} 
        r={circleRadius}
      />
      <Legend 
        xScale={xScale} 
        circleRadius={circleRadius} 
        currentPosition={radiusPosition}
      />
      <Wrapper
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        setRadiusPosition={setRadiusPosition}
        setCircleRadius={setCircleRadius}
        minBound={minBound}
        maxBound={maxBound}
        setActiveForeground={setActiveForeground}
      />
    </SVGWrapper>
  )
}

Slider.displayName="Slider";