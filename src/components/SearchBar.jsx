import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ResultCard from "./ResultCard";
import SkeletonCard from "./SkeletonCard";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const apiKeyQuery = "&apikey=e5idzgMtFYlaR1VaaQ1jdgwk4FmmKWXQ";

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);

    axios
      .get(
        `https://financialmodelingprep.com/stable/mergers-acquisitions-search?name=${query}${apiKeyQuery}`
      )
      .then((response) => {
        setResults(response.data);
        if (response.data?.length === 0) setError("No results.");
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong while fetching data.");
      })
      .finally(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    });
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(
        `https://financialmodelingprep.com/stable/mergers-acquisitions-latest?apikey=e5idzgMtFYlaR1VaaQ1jdgwk4FmmKWXQ`
      )
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load latest M&A data.");
      })
      .finally(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8 cards-container">
      <section aria-labelledby="search-form" className="mb-12">
        <form
          id="search-form"
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-4 flex-wrap"
          role="search"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Company Name..."
            className="w-full max-w-md rounded-lg px-4 py-2 border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none"
            aria-label="Company name"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-[#ededed] font-bold py-2 px-4 rounded flex items-center gap-2"
            aria-label="Search"
          >
            <Search className="text-[#ededed]" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </section>

      <section aria-labelledby="results-heading">
      <div className="min-h-[3rem] flex justify-center items-center mb-4">
        <AnimatePresence mode="wait">
            {results.length > 0 && (
            <motion.h2
                key={hasSearched ? "search-results" : "latest-results"}
                className="text-2xl font-semibold text-gray-800 text-center"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.5, ease: "easeOut" }} // match ResultCard
            >
                {hasSearched ? "Search Results" : "Latest M&A Results"}
            </motion.h2>
            )}
        </AnimatePresence>
        </div>






        {loading && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold mt-4">{error}</p>
        )}

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            results.map((item, index) => (
              <ResultCard key={index} item={item} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default SearchBar;
