import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Search from './Components/Search/Search';
import './App.css';


function App() {
	const navigate = useNavigate();
	const [randomPoems, setRandomPoems] = useState<string[]>();
	const [isRandomizeClicked, setIsRandomizeClicked] = useState<boolean>(false);

	const updateSearchString = (newSearchString: String) => {
		navigate("/results?poem=" + newSearchString + "&page=1");
	};

	const onRandonmizeClick = () => {
		setRandomPoems(undefined);
		setIsRandomizeClicked(true);
		navigate("/");
	}

	const onFavouriteClick = () => {
		navigate("/favourites?page=1");
	}

	return (
		<>
			<div>
				<div className='site-header'>
					<h2 id='site-name' onClick={() => navigate("/", {state: {searchResults: {}}}) }> Poetry </h2>
					<div id='navigation-container'>
						<Search updateSearchString={(newSearch: String) => {updateSearchString(newSearch)} }/>
						<div className='d-md-none mt-1'/>
						<Button variant='light' onClick={onRandonmizeClick}>Randomize</Button>
						<Button variant='light' onClick={onFavouriteClick}>Favourites</Button>
					</div>
				</div>
			</div>
			<div>
				<Outlet context={{randomPoems, setRandomPoems, isRandomizeClicked, setIsRandomizeClicked}}/>
			</div>
		</>
	);
};

export default App;
