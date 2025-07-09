// Context imports
import { useMask } from 'context/maps/mask';

// Third party imports
import * as d3 from 'd3';

export const Bars = ({ xScale, minBound, maxBound, innerWidth, innerHeight }: any) => {
    const { maskProperties } = useMask();
    
    if (!maskProperties) return <></>;

    const parcelAreas = maskProperties.reduce((total: any, item: any) => {
        const currentArea = item.properties.area_carto;
        if (currentArea < maxBound) {
            total.push(currentArea)
        }
        return total
    }, [])

    const getCountByRange = (areasArray: any, lowerBound: any, upperBound: any, step: number) => {
      let counts: any = {};
      let currentRange = lowerBound;

      while (currentRange <= upperBound) {
        const previousRange = currentRange - step;
        const filterArray = areasArray.filter((item: any) => previousRange < item && item < currentRange);
        const areasArrayLength = filterArray.length;

        counts[currentRange] = areasArrayLength;
        currentRange += step;
      }
      return counts;
    }

    const step = 50;
    const areasCount = getCountByRange(parcelAreas, minBound, maxBound, step);

    const countValues: any = Object.values(areasCount).map((item: any) => item);
    const minCount: any = d3.min(countValues)
    const maxCount: any = d3.max(countValues)

    const yScale = d3.scaleLinear()
      .domain([minCount, maxCount])
      .range([0, innerHeight]);

    const currentWidth = innerWidth / countValues.length;

    return (
        <>
            {Object.keys(areasCount).slice(0, -1).map((item: any) => {
                const currentHeight = areasCount[item];

                return(
                    <rect
                        key={item}
                        x={xScale(item) + 1}
                        y={innerHeight - yScale(currentHeight)}
                        width={currentWidth - 2}
                        height={yScale(currentHeight)}
                        fill={"rgba(126, 126, 132, 0.6)"}
                    />
                )
            })}
        </>
    )
}

Bars.displayName="Bars"