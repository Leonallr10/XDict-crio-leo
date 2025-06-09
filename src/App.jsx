import { useState, useCallback } from 'react'
import './App.css'

function App() {
  // Initialize dictionary with the provided data
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." }
  ]);

  // State for search term and result
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');

  // Handle search functionality
  const handleSearch = useCallback(() => {
    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      setSearchResult('');
      return;
    }

    // Case-insensitive search
    const foundWord = dictionary.find(
      item => item.word.toLowerCase() === trimmedTerm.toLowerCase()
    );

    if (foundWord) {
      setSearchResult(foundWord.meaning);
    } else {
      setSearchResult('Word not found in the dictionary.');
    }
  }, [searchTerm, dictionary]);

  // Handle Enter key press in input field
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="app">
      <h1>Dictionary App</h1>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a word..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {searchResult && (
        <div className="result-container">
          {searchResult === 'Word not found in the dictionary.' ? (
            <p>{searchResult}</p>
          ) : (
            <>
              <h3>Definition:</h3>
              <p>{searchResult}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App
