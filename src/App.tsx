import { Outlet, useNavigate } from 'react-router';
import './App.css';
import { Button } from 'react-bootstrap';
import Search from './Components/Search/Search';
import { useEffect, useState } from 'react';
import type { SearchResult } from './Util/poem';
import fetchPoems from "./Util/request";


function App() {
	const [searchResults, setSearchResults] = useState<SearchResult>();
	const [randomPoems, setRandomPoems] = useState<SearchResult>();
	const navigate = useNavigate();

	const updateSearchResults = (newResults: SearchResult) => {
		setSearchResults(newResults);
	};

	const onRandonmizeClick = () => {
		setRandomPoems(undefined);
		navigate("/");
	}

	const onFavouriteClick = () => {
		const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
		const favouritePoems = fetchPoems(new URL(apiUrl + "/favourites"));
		favouritePoems.then((results) => {
			navigate("/results", {state: {searchResults: results}});
		})
	}

	useEffect(() => {
		if (searchResults) {
			navigate("/results", { state: { searchResults: searchResults } });
		}
	}, [searchResults]);

	return (
		<>
			<div>
				<div className='site-header'>
					<h2 id='site-name' onClick={() => navigate("/", {state: {searchResults: {}}}) }> Poetry </h2>
					<div id='navigation-container'>
						<Search updateResults={(newResults: SearchResult) => { updateSearchResults(newResults) }} />
						<div className='d-md-none mt-1'/>
						<Button variant='light' onClick={onRandonmizeClick}>Randomize</Button>
						<Button variant='light' onClick={onFavouriteClick}>Favourites</Button>
					</div>
				</div>
			</div>
			<div>
				<Outlet context={{randomPoems, setRandomPoems}}/>
			</div>
		</>
	);
};

export default App;
