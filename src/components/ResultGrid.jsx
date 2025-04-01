import { motion, AnimatePresence } from "framer-motion";
import ResultCard from "./ResultCard";
import SkeletonCard from "./SkeletonCard";

const ResultGrid = ({ results, loading, error, hasSearched, onCardClick }) => (
  <section aria-labelledby="results-heading">
    <div className="min-h-[3rem] flex justify-center items-center mb-4">
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.h2
            id="results-heading"
            key={hasSearched ? "search-results" : "latest-results"}
            className="text-2xl font-semibold text-gray-800 text-center"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {hasSearched ? "Search Results" : "Latest M&A Results"}
          </motion.h2>
        )}
      </AnimatePresence>
    </div>

    {loading && (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )}

    {error && (
      <p className="text-center text-red-600 font-semibold mt-4">
        {error}
      </p>
    )}

    {!loading && results.length > 0 && (
      <section
        aria-label="Mergers & Acquisitions Results"
        className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {results.map((item, index) => (
          <ResultCard key={index} item={item} onProfileClick={() => onCardClick(item.symbol)} />
        ))}
      </section>
    )}
  </section>
);

export default ResultGrid;
