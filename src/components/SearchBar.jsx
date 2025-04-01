import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import ResultCard from "./ResultCard";

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

        axios.get(`https://financialmodelingprep.com/stable/mergers-acquisitions-search?name=${query}${apiKeyQuery}`)
            .then(response => {
                setResults(response.data);

                response.data?.length === 0 && setError("No results.");
            })
            .catch(error => {
                console.error(error);
                setError("Something went wrong while fetching data.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);
        setError("");
        
        axios.get(`https://financialmodelingprep.com/stable/mergers-acquisitions-latest?apikey=e5idzgMtFYlaR1VaaQ1jdgwk4FmmKWXQ`)
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load latest M&A data.");
            })
            .finally(() => setLoading(false));
    }, []);
    

    return (
        <div className="min-h-screen bg-gray-100 p-8 cards-container">
            <form onSubmit={handleSubmit} className="flex items-center justify-center mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Company Name..."
                    className="w-full max-w-md rounded-lg px-4 py-2 border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-[#ededed] font-bold py-2 px-4 rounded ml-4"
                >
                    <Search className=" text-[#ededed]" />
                </button>
            </form>

            {loading && <p className="text-center text-blue-600 font-semibold">Loading...</p>}
            {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

            {(results.length > 0 && !hasSearched) && (
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Latest M&A Results</h2>
            )}

            {(results.length > 0 && hasSearched) && (
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Search Results</h2>
            )}

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((item, index) => (
                    <ResultCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
