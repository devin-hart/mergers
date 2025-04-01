import { motion } from "framer-motion";

const ResultCard = ({ item, onProfileClick }) => {
    return (
      <motion.article
        className="bg-white p-6 rounded-lg shadow-md text-left result-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-labelledby={`card-title-${item.symbol}-${item.date}`}
      >
        <header>
          <h2
            id={`card-title-${item.symbol}-${item.date}`}
            className="text-lg font-bold text-gray-900 mb-2"
          >
            {item.company} {item.symbol && `(${item.symbol})`}
          </h2>
        </header>
  
        <section className="space-y-1">
          <p className="text-sm text-gray-700">
            <strong>Acquired:</strong> {item.target}{" "}
            {item.targetSymbol && `(${item.targetSymbol})`}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Transaction Date:</strong> {item.date}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Accepted Date:</strong>{" "}
            {new Date(item.accepted).toLocaleString()}
          </p>
        </section>
  
        <footer className="mt-4 flex justify-between items-center">
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
            >
                SEC Filing
            </a>

            {item.symbol && (
                <button
                onClick={onProfileClick}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                View Profile
                </button>
            )}
        </footer>

      </motion.article>
    );
  };
  
  export default ResultCard;
  