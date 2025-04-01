import { motion } from "framer-motion";

const ResultCard = ({ item }) => {
  return (
    <motion.article
      className="bg-white p-6 rounded-lg shadow-md text-left result-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-labelledby={`card-title-${item.symbol}-${item.transactionDate}`}
    >
      <header>
        <h2
          id={`card-title-${item.symbol}-${item.transactionDate}`}
          className="text-lg font-bold text-gray-900 mb-2"
        >
          {item.companyName} ({item.symbol})
        </h2>
      </header>

      <section className="space-y-1">
        <p className="text-sm text-gray-700">
          <strong>Acquired:</strong> {item.targetedCompanyName}
          {item.targetedSymbol && ` (${item.targetedSymbol})`}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Transaction Date:</strong> {item.transactionDate}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Accepted Date:</strong>{" "}
          {new Date(item.acceptedDate).toLocaleString()}
        </p>
      </section>

      <footer className="mt-2">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm block"
        >
          SEC Filing
        </a>
      </footer>
    </motion.article>
  );
};

export default ResultCard;
