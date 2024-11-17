import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const [input, setInput] = useState("");

  return (
    <div className="bg-white w-auto border pt-0 flex items-center rounded-full px-10 m-0">
      <FaSearch id="search-icon" className="items-center" />
        <form className="flex">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search recipes by name or by ingredients"
                className="bg-transparent border-none ml-[5px] w-96 px-2 py-1 text-color-6"
            />
            <button type="submit" className="font-bold ">Search</button>
        </form>  
    </div>
  )
}

export default SearchBox;
