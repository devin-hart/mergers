import { useState, useEffect } from "react";
import { fetchMergers, normalizeResult } from "../services/api";
import SearchForm from "./SearchForm";
import ResultGrid from "./ResultGrid";
import CompanyModal from "./CompanyModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const fetchData = async (query = "", showEmptyMessage = false) => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const rawData = await fetchMergers(query);
      const normalized = rawData.map(normalizeResult);
      setResults(normalized);

      if (normalized.length === 0 && showEmptyMessage) {
        setTimeout(() => {
          setError("No results.");
        }, 500);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setHasSearched(false);
      fetchData();
      return;
    }

    setHasSearched(true);
    fetchData(trimmed, true);
  };

  useEffect(() => {
    fetchData(); // Load latest on mount
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8 cards-container">
      <SearchForm query={query} setQuery={setQuery} handleSubmit={handleSubmit} />

      <ResultGrid
        results={results}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
        onCardClick={setSelectedSymbol}
      />

      {selectedSymbol && (
        <CompanyModal
          symbol={selectedSymbol}
          onClose={() => setSelectedSymbol(null)}
        />
      )}
    </main>
  );
};

export default App;
