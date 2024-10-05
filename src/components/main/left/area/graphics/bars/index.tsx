// Context imports
import { useParcelsApi } from '../../../../../context/api/geom/parcels';

// Third party imports
import * as d3 from 'd3';

export const Bars = ({ xScale, minBound, maxBound, innerWidth, innerHeight }: any) => {
    const { parcelsData } = useParcelsApi();
    if (!parcelsData) return <></>;
    const parcelAreas = parcelsData.filter((item: any) => item.area < maxBound);

    const getCountByRange = (areasArray: any, lowerBound: any, upperBound: any, step: number) => {
      let counts: any = {};
      let currentRange = lowerBound;
      while (currentRange <= upperBound) {
        const previousRange = currentRange - step;
        const filterArray = areasArray.filter((item: any) => previousRange < item.area && item.area < currentRange);
        const areasArrayLength = filterArray.length;

        const freeTerrainArray = filterArray.filter((item: any) => item.constructed_area === 0);
        const freeTerrainArrayLength = freeTerrainArray.length;
        
        counts[currentRange] = {
            totalLength: areasArrayLength,
            freeLength: freeTerrainArrayLength,
            constructedLength: areasArrayLength - freeTerrainArrayLength,
        };
        currentRange += step;
      }
      return counts;
    }

    const step = 50;
    const areasCount = getCountByRange(parcelAreas, minBound, maxBound, step);

    const countValues: any = Object.values(areasCount).map((item: any) => item.totalLength);
    const minCount: any = d3.min(countValues)
    const maxCount: any = d3.max(countValues)

    const yScale = d3.scaleLinear()
      .domain([minCount, maxCount])
      .range([0, innerHeight]);

    const currentWidth = innerWidth / countValues.length;

    return (
        <>
            {Object.keys(areasCount).slice(0, -1).map((item: any) => {
                const currentHeight = areasCount[item].freeLength;
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
            {Object.keys(areasCount).slice(0, -1).map((item: any) => {
                const previousHeight = areasCount[item].freeLength;
                const currentHeight = areasCount[item].constructedLength;

                return(
                    <rect
                        key={item}
                        x={xScale(item) + 1}
                        y={innerHeight - yScale(currentHeight) - yScale(previousHeight)}
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