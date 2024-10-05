// React imports
import { useCallback, Children, cloneElement } from 'react';

// Context imports
import { useBarsSizes } from '../../../../../context/sizes/left/bars';

export const SVGWrapper = ({ children }: any) => {
	const { margin, width, height, setWidth, setHeight } = useBarsSizes();

	const parentRef = useCallback((node: any)=> {
	    if (node) {
	    	const currentWidth = node.getBoundingClientRect().width;
	    	const currentHeight = node.getBoundingClientRect().height;
			setWidth(currentWidth);
			setHeight(currentHeight);
	    }
	  }, []);
	
	if (width === 0) return <></>
	
	return (
		<div ref={parentRef} style={{width: "100%", height: "100%"}}>
			{width && <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
				<g transform={`translate(${margin.left}, ${margin.top})`}>
				{Children.map(children, (child, index) => {
		            return cloneElement(child, {width: "100%"});
		        })}
		        </g>
			</svg>}
		</div>
	)
}

SVGWrapper.displayName="SVGWrapper";