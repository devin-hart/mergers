import { motion } from "framer-motion";

const ResultCard = ({ item }) => {
  return (
    <motion.article
      className="bg-white p-6 rounded-lg shadow-md text-left result-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-labelledby={`card-title-${item.symbol}-${item.date}`}
    >
        <header className="mb-2">
            <h2 className="text-lg font-bold text-gray-900">
                {item.target} {item.targetSymbol && `(${item.targetSymbol})`}
            </h2>
            <h3 className="text-sm font-medium text-gray-800">
                Acquirer: {item.company} {item.symbol && `(${item.symbol})`}
            </h3>
            {item.dealStatus && (
                <p className="text-sm text-gray-700 italic">{item.dealStatus}</p>
            )}
        </header>

      <section className="space-y-1 text-sm text-gray-700">
        <p><strong>Acquirer Exchange:</strong> {item.acquirerExchange || "—"}</p>
        <p><strong>Target Ticker:</strong> {item.targetSymbol || "—"}</p>
        <p><strong>Target Exchange:</strong> {item.targetExchange || "—"}</p>
        <p><strong>Date Announced:</strong> {item.date}</p>
        <p><strong>Date Expected:</strong> {item.dateExpected || "—"}</p>
        <p><strong>Date Completed:</strong> {item.dateCompleted || "—"}</p>
        <p><strong>Deal Type:</strong> {item.dealType || "—"}</p>
        <p><strong>Deal Size:</strong> {item.dealSize || "—"}</p>
        <p><strong>Currency:</strong> {item.currency || "—"}</p>
        <p><strong>Payment Type:</strong> {item.paymentType || "—"}</p>
        <p><strong>Importance:</strong> {item.importance || "—"}</p>
        <p><strong>Terms:</strong> {item.dealTerms || "—"}</p>
        {item.notes && (
          <p className="italic text-gray-600 mt-2">{item.notes}</p>
        )}
      </section>

    </motion.article>
  );
};

export default ResultCard;
