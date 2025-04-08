import { useState, useEffect } from "react";
import { fetchMergers, normalizeResult } from "../services/api";
import ResultGrid from "./ResultGrid";
import DateRangeSelector from "./DateRangeSelector";
import CompanyListUploader from "./CompanyListUploader";
import { Search } from "lucide-react";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [dateRange, setDateRange] = useState(60);
  const [priorityList, setPriorityList] = useState([]);
  const [uploadResetSignal, setUploadResetSignal] = useState(0);

  const sortByPriority = (items, priority) => {
    return [...items].sort((a, b) => {
      const idxA = priority.findIndex((n) => a.target?.toLowerCase().includes(n));
      const idxB = priority.findIndex((n) => b.target?.toLowerCase().includes(n));
      return idxA === -1 ? 1 : idxB === -1 ? -1 : idxA - idxB;
    });
  };

  const applyFilters = (items, query, priority) => {
    let filtered = items;

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter((item) => item.target?.toLowerCase().includes(q));
    }

    if (priority.length) {
      filtered = filtered.filter((item) =>
        priority.some((name) => item.target?.toLowerCase().includes(name))
      );
      return sortByPriority(filtered, priority);
    }

    return filtered;
  };

  const fetchData = async (range = dateRange) => {
    setLoading(true);
    setError("");

    try {
      const rawData = await fetchMergers(range);
      const normalized = rawData.map(normalizeResult);
      setResults(normalized);
      const filtered = applyFilters(normalized, query, priorityList);
      setFilteredResults(filtered);
      if (!filtered.length) setTimeout(() => setError("No results."), 500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    setPriorityList([]);
    setUploadResetSignal((n) => n + 1);
    const filtered = applyFilters(results, query, []);
    setFilteredResults(filtered);
    if (!filtered.length) setError("No results.");
  };

  const handleFileUpload = ({ names }) => {
    setPriorityList(names);
    setHasSearched(true);
    const filtered = applyFilters(results, "", names);
    setFilteredResults(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8 cards-container">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-2 w-full mb-6"
      >
        <input
          type="text"
          placeholder="Search by target company name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded text-sm w-full sm:w-96 h-10"
        />

        <div className="flex flex-row w-full sm:w-auto gap-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-4 h-10 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors w-1/2 sm:w-auto"
          >
            <Search className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>

          <div className="w-1/2 sm:w-auto">
            <CompanyListUploader
              onFileSelect={handleFileUpload}
              resetSignal={uploadResetSignal}
            />
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <label htmlFor="date-range" className="sr-only">
            Show M&As From
          </label>
          <DateRangeSelector
            selectedRange={dateRange}
            onChange={(days) => {
              setDateRange(days);
              setHasSearched(true);
              fetchData(days);
            }}
          />
        </div>
      </form>

      <ResultGrid
        results={filteredResults}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
      />
    </main>
  );
};

export default App;
