import { Outlet, useNavigate } from 'react-router';
import './App.css';
import Search  from './Components/Search/Search';
import { useState } from 'react';
import type { Poem, SearchResult } from './Util/poem';

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult>({});
  const navigate = useNavigate();

  const updateSearchResults = (newResults : SearchResult) => {
    setSearchResults(newResults);
    //console.log("updated you fool", searchResults);
    navigate("/results", {state: {searchResults: searchResults}})
  };

  return (
    <>
      <div>
        <div className='site-header'>
          <h2 id='site-name'> PoetryDatabase </h2>
          <div id='navigation-container'>
            <Search updateResults={(newResults: SearchResult) => {updateSearchResults(newResults)}}/>
          </div>
        </div>
      </div>
      <div>
          <Outlet context={searchResults}/>
      </div>
    </>
  )
}

export default App;
