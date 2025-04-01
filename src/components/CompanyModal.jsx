import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CompanyModal = ({ symbol, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;

    setLoading(true);
    setError("");
    setProfile(null);
    setShowContent(false);

    const controller = new AbortController();

    const loadData = async () => {
      try {
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=e5idzgMtFYlaR1VaaQ1jdgwk4FmmKWXQ`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (!data || !data.length) throw new Error("No profile found.");
        setProfile(data[0]);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Could not load company profile.");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowContent(true);
        }, 500);
      }
    };

    loadData();

    return () => controller.abort();
  }, [symbol]);

  // 🔐 Optional: ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!symbol) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <motion.section
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-lg w-full p-6 relative"
          role="document"
          tabIndex={-1}
        >
          <h2 id="modal-title" className="sr-only">
            Company Profile
          </h2>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
            aria-label="Close modal"
          >
            ✕
          </button>

          {error && (
            <p className="text-center text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: showContent ? 1 : 0,
              visibility: showContent ? "visible" : "hidden",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`space-y-3 transition-opacity ${profile ? "block" : "hidden"}`}
          >
            <h3 className="text-xl font-bold">
              {profile?.companyName} ({profile?.symbol})
            </h3>
            <p className="text-sm italic">{profile?.exchange}</p>
            <p className="text-sm">{profile?.description}</p>

            <div className="text-sm space-y-1">
              <p><strong>Sector:</strong> {profile?.sector}</p>
              <p><strong>Industry:</strong> {profile?.industry}</p>
              <p><strong>Market Cap:</strong> ${Number(profile?.mktCap).toLocaleString()}</p>
              <p><strong>Price:</strong> ${profile?.price}</p>
              {profile?.website && (
                <p>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Website
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompanyModal;
