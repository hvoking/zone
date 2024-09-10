// React imports
import { useState, useRef } from 'react';

// App imports
import { Suggestions } from './suggestions';
import './styles.scss';

// Context imports
import { useGeo } from '../../../context/filters/geo';
import { useGoogleSearchApi } from '../../../context/api/google/search';

export const Search = ({ activeSearch, setActiveSearch }: any) => {
	const { setPlaceId } = useGeo();
	const { googleSearchData, searchText, setSearchText } = useGoogleSearchApi();

	const [ suggestionIndex, setSuggestionIndex ] = useState(0);
	const [ suggestionsActive, setSuggestionsActive ]= useState(false);
	const inputRef = useRef<any>(null);

	const suggestions = googleSearchData && googleSearchData.predictions.reduce((total: any, item: any) => {
		const placeName = item.description.toLowerCase()
		total.push(placeName)
		return total
	}, []);

	const handleChange = (e: any) => {
		const query = e.target.value;
		setSearchText(query);

		if (query.length > 0) {
			setSuggestionsActive(true);
		}
		else {
			setSuggestionsActive(false)
		}
	};

	const getCurrentPrediction = (currentSearchValue: any) => {
		googleSearchData && googleSearchData.predictions.filter((item: any) => {
			const placeName = item.description.toLowerCase().trim();
			if (placeName === currentSearchValue) {
				setPlaceId(item.place_id);
			}
		})
	}

	const handleClick = (e: any) => {
		const currentSearchValue = e.target.innerText.trim();
		getCurrentPrediction(currentSearchValue)
		setSearchText(currentSearchValue);
		setSuggestionsActive(false);
	};

	const handleKeyDown = (e: any) => {
		// up arrow
		if (e.keyCode === 38) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		// down arrow
		else if (e.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions.length) {
				return
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		// enter
		else if (e.keyCode === 13) {
			const currentSearchValue: any = suggestions && suggestions[suggestionIndex]
			getCurrentPrediction(currentSearchValue)
			currentSearchValue && setSearchText(currentSearchValue);
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}

		// scape
		else if (e.keyCode === 27) {
			setSearchText("");
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}
	};

	const cleanSuggestions = () => {
		setSearchText("");
		setSuggestionIndex(0);
		setSuggestionsActive(false);
	}

	return (
		<div style={{display: "flex"}}>
			<img 
				className="search-icon"
				src={process.env.PUBLIC_URL + "/static/components/search/search_icon.svg"} 
				alt="search-icon"
				onClick={() => setActiveSearch((prev: boolean) => !prev)}
			/>
			<div className="search-wrapper">
				{activeSearch && 
					<>
						<input 
							className="search-input"
							type="text" 
							placeholder="Search..."
							value={searchText}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							spellCheck={false}
							ref={inputRef}
						/>
						<div className="cancel-cross-wrapper">
							<img
								className="cancel-cross"
								src={process.env.PUBLIC_URL + "/static/components/search/cancel_search.svg"} 
								alt="search-icon"
								onClick={cleanSuggestions}
							/>
						</div>
						{suggestionsActive && suggestions &&
							<Suggestions 
								suggestions={suggestions} 
								suggestionIndex={suggestionIndex} 
								handleClick={handleClick}
							/>
						}
					</>
				}
			</div>
		</div>
	)
}

Search.displayName="Search";