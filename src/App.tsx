import './App.css';
import Search  from './Components/Search/Search';

function App() {
  
  
  return (
    <>
      <div>
        <div className='site-header'>
          <h2 id='site-name'> PoetryDatabase </h2>
          <div id='navigation-container'>
            <Search />
          </div>
        </div>
      </div>
      <div>
            
      </div>
    </>
  )
}

export default App
