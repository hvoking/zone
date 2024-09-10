// Context imports
import { useVectors } from '../../../../context/filters/vectors';

export const SideDimensions = ({ xScale, xBottom, yBottom, distLeft }: any) => {
  const { iRight, jRight, iLeft, jLeft } = useVectors();

  const lineOffset = 6;
  const numberOffset = 12;

  const xStart = xBottom - iLeft * lineOffset
  const yStart = yBottom - jLeft * lineOffset

  const xEnd = xStart + iRight * xScale(distLeft);
  const yEnd = yStart + jRight * xScale(distLeft);

  const xMiddle = (xStart + xEnd) / 2;
  const yMiddle = (yStart + yEnd) / 2;

    return (
      <g>
        <line 
          stroke="rgba(126, 126, 132, 1)"
          strokeWidth={0.6}
          x1={xStart} 
          y1={yStart} 
          x2={xEnd} 
          y2={yEnd}
        />
        <text
          fill="rgba(126, 126, 132, 1)"
          x={xMiddle - iLeft * numberOffset} 
          y={yMiddle - jLeft * numberOffset} 
          dominantBaseline="middle" 
          textAnchor="middle"
          fontSize="0.8em"
        >
         {`${Math.round(distLeft)}`}
        </text>
      </g>
    )
  }

  SideDimensions.displayName="SideDimensions";