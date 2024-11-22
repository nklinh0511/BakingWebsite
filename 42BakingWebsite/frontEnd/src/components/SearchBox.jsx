import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import SearchToggle from './SearchToggle';

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // Clear the previous timeout
    timer = setTimeout(() => {
      func(...args); // Call the function after the specified delay
    }, delay);
  };
}

const SearchBox = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const [searchMode, setSearchMode] = useState('name');
  console.log(searchMode);

  const handleSearchModeChange = (e) => {
    setSearchMode(e.target.value);
    debouncedFetchRecipes(input);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInput(input);
    debouncedFetchRecipes(input); // Call the debounced fetch function
  };

  const handleSelectResult = (recipe) => {
    setInput(recipe.name); // Optionally, set the input field with the selected result
    setResults([]); // Clear results after selection
  };


 

  const fetchRecipes = async(input) => {
    if (!input.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8080/recipes/searchBy?${searchMode}=${input}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setResults(data.recipes); // Assuming the response has an array of recipes in `recipes`
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }; 

  const debouncedFetchRecipes = debounce(fetchRecipes, 500);

  return (
    <div className="bg-white w-auto border pt-0 flex items-center rounded-full px-10 m-0">
      <FaSearch id="search-icon" className="items-center" />
        <form className="flex">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Search recipes by name or by ingredients"
                className="font-poppins bg-transparent border-none ml-[5px] w-96 px-2 py-1 text-color-6"
            />
            <button type="submit" className="font-bold font-poppins ">Search</button>

            <select onChange={handleSearchModeChange} value={searchMode} className="px-2 font-poppins">
              <option value="name" className='font-poppins'>By Name</option>
              <option value="ingredients" className='font-poppins'>By Ingredients</option>
            </select>
        </form>  

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="dropdown">
        {results.length > 0 && (
          <ul>
            {results.map((recipe) => (
              <li key={recipe.id} onClick={() => handleSelectResult(recipe)}>
                {recipe.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {results.length === 0 && !loading && !error && input && (
        <p>No results found</p>
      )}
    </div>
  )
}


export default SearchBox;
