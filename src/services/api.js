const BASE_URL = "https://financialmodelingprep.com/stable";
const API_KEY = "e5idzgMtFYlaR1VaaQ1jdgwk4FmmKWXQ";

export const fetchMergers = async (query = "") => {
  const encodedQuery = encodeURIComponent(query.trim());
  const endpoint = query
    ? `mergers-acquisitions-search?name=${encodedQuery}`
    : "mergers-acquisitions-latest";

  const joiner = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}/${endpoint}${joiner}apikey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");

  return await response.json();
};

export const normalizeResult = (item) => ({
  company: item.companyName,
  symbol: item.symbol,
  target: item.targetedCompanyName,
  targetSymbol: item.targetedSymbol,
  date: item.transactionDate,
  accepted: item.acceptedDate,
  link: item.link,
});
