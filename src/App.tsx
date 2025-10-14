import { Outlet, useNavigate } from 'react-router';
import './App.css';
import Search from './Components/Search/Search';
import { useEffect, useState } from 'react';
import type { SearchResult } from './Util/poem';


function App() {
	const [searchResults, setSearchResults] = useState<SearchResult>();
	const navigate = useNavigate();

	const updateSearchResults = (newResults: SearchResult) => {
		setSearchResults(newResults);
	};

	useEffect(() => {
		if (searchResults) {
			navigate("/results", { state: { searchResults: searchResults } });
		}
	}, [searchResults]);

	return (
		<>
			<div>
				<div className='site-header'>
					<h2 id='site-name' onClick={() => navigate("/", {state: {searchResults: {} }})}> Poetry </h2>
					<div id='navigation-container'>
						<Search updateResults={(newResults: SearchResult) => { updateSearchResults(newResults) }} />
					</div>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default App;
