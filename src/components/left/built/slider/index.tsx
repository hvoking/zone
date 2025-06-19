// App imports
import { SVGWrapper } from './svg';
import { Legend } from './legend';
import { Background } from './background';
import { Foreground } from './foreground';
import { Handler } from './handler';
import { Wrapper } from './wrapper';

// Context imports
import { useBuiltAreas } from 'context/filters/areas/built';
import { useConstructionSliderSizes } from 'context/sizes/slider/construction';

import * as d3 from 'd3';

export const Slider = ({ activeForeground, setActiveForeground }: any) => {
  const { innerWidth, innerHeight } = useConstructionSliderSizes();
  const { minBound, maxBound, leftPosition, setLeftPosition, rightPosition, setRightPosition } = useBuiltAreas();

  const circleRadius = innerHeight / 6;
  const offset = 20;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offset, innerWidth - offset ]);

  return (
    <SVGWrapper>
      <Legend 
        xScale={xScale}
        circleRadius={circleRadius} 
        currentPosition={leftPosition}
      />
      <Legend 
        xScale={xScale} 
        circleRadius={ circleRadius }
        currentPosition={rightPosition}
      />
      <Background
        xScale={xScale} 
        minBound={minBound} 
        maxBound={maxBound} 
        circleRadius={circleRadius}
      />
      <Foreground
        xScale={xScale} 
        leftPosition={leftPosition} 
        rightPosition={rightPosition} 
        circleRadius={circleRadius}
        activeForeground={activeForeground}
      />
      <Handler
        activeForeground={activeForeground}
        cx={xScale(leftPosition)} 
        cy={circleRadius} 
        r={circleRadius} 
      />
      <Handler
        activeForeground={activeForeground}
        cx={xScale(rightPosition)} 
        cy={circleRadius} 
        r={circleRadius}
      />
      <Wrapper
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        leftPosition={leftPosition}
        rightPosition={rightPosition}
        setLeftPosition={setLeftPosition}
        setRightPosition={setRightPosition}
        minBound={minBound}
        maxBound={maxBound}
        setActiveForeground={setActiveForeground}
      />
    </SVGWrapper>
  )
}

Slider.displayName="Slider";