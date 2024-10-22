// App imports
import { SVGWrapper } from './svg';
import { Bars } from './bars';
import { Foreground } from './foreground';
import { Wrapper } from './wrapper';

// Context imports
import { useParcelAreas } from '../../../../context/filters/areas/parcel';
import { useBarsSizes } from '../../../../context/sizes/bars';

import * as d3 from 'd3';

export const Graphics = ({ activeForeground, setActiveForeground }: any) => {
  const { innerWidth, innerHeight } = useBarsSizes();
  const { minBound, maxBound, leftPosition, setLeftPosition, rightPosition, setRightPosition } = useParcelAreas();

  const offset = 20;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offset, innerWidth - offset ]);

  return (
    <div style={{overflow: "hidden"}}>
      <SVGWrapper>
        <Bars
          xScale={xScale}
          minBound={minBound} 
          maxBound={maxBound} 
          innerWidth={innerWidth} 
          innerHeight={innerHeight} 
        />
        <Foreground
          xScale={xScale} 
          innerHeight={innerHeight}
          leftPosition={leftPosition} 
          rightPosition={rightPosition} 
          activeForeground={activeForeground}
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
    </div>
  )
}

Graphics.displayName="Graphics";