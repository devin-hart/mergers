import { motion } from "framer-motion";

const ResultCard = ({ item }) => {
    return (
        <motion.div
            className="bg-white p-6 rounded-lg shadow-md text-left result-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <h2 className="text-lg font-bold text-gray-900 mb-2">
                {item.companyName} ({item.symbol})
            </h2>
            <p className="text-sm text-gray-700">
                <strong>Acquired:</strong> {item.targetedCompanyName}({item.targetedSymbol})
            </p>
            <p className="text-sm text-gray-700">
                <strong>Transaction Date:</strong> {item.transactionDate}
            </p>
            <p className="text-sm text-gray-700">
                <strong>Accepted Date:</strong> {new Date(item.acceptedDate).toLocaleString()}
            </p>
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-2 block"
            >
                SEC Filing
            </a>
        </motion.div>
    );
};

export default ResultCard;
