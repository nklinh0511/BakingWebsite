import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

      navigate(`/recipe/id/${recipe.id}`);

  };

  const fetchRecipes = async(input) => {
    if (!input.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8080/recipes/searchBy${searchMode}?${searchMode}=${input}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setResults(data); // Assuming the response has an array of recipes in `recipes`
      console.log(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }; 

  const debouncedFetchRecipes = debounce(fetchRecipes, 500);

  return (
    <div className="relative">
    <div className="bg-white w-auto border pt-0 flex items-center rounded-full px-10 m-0">
      <FaSearch id="search-icon" className="items-center" />
        <form className="flex">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Search recipes by name or by ingredients"
                className="relative font-poppins bg-transparent border-none ml-[5px] w-96 px-2 py-1 text-color-6"
            />
            <button type="submit" className="font-bold font-poppins ">Search</button>

            <select onChange={handleSearchModeChange} value={searchMode} className="px-2 font-poppins">
              <option value="name" className='font-poppins'>By Name</option>
              <option value="ingredient" className='font-poppins'>By Ingredients</option>
            </select>
        </form>  

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

      </div>
      <div className="width-full">
      <div className="bg-white absolute w-full border border-gray-300 rounded-md shadow-lg mt-1 z-10">
  {Array.isArray(results) && results.length > 0 && (
    <ul className="max-h-60 overflow-y-auto">
      {results.map((recipe) => (
        <li
          key={recipe.id}
          onClick={() => handleSelectResult(recipe)}
          className="font-poppins text-color-6 px-4 py-2 cursor-pointer hover:bg-gray-200"
        >
          {recipe.name}
        </li>
      ))}
    </ul>
  )}
</div>

      {Array.isArray(results) && results.length === 0 && !loading && !error && input && (
        <p>No results found</p>
      )}
      </div>
    </div>
  )
}


export default SearchBox;
