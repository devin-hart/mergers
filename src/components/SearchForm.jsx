import { Search } from "lucide-react";

const SearchForm = ({ query, setQuery, handleSubmit }) => (
    <header className="mb-12 text-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-wrap gap-4"
        role="search"
      >
        <label htmlFor="search" className="sr-only">
          Search for a company
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Company Name..."
          className="w-full max-w-md rounded-lg px-4 py-2 border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          <Search className="text-white" />
          <span className="sr-only">Search</span>
        </button>
      </form>
    </header>
  );
  
  export default SearchForm;
  