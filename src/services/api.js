const BASE_URL = "https://api.benzinga.com/api/v2.1/calendar";
const API_KEY = "ff57cbc82774439a8fda66033ea54ec9";

export const fetchMergers = async (daysBack = 60, dateSort = "") => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - daysBack);
  
    const fromFormatted = from.toISOString().split("T")[0];
    const toFormatted = to.toISOString().split("T")[0];
  
    let url = `${BASE_URL}/ma?date_from=${fromFormatted}&date_to=${toFormatted}&pagesize=1000&token=${API_KEY}`;
    
    if (dateSort) {
      url += `&date_sort=${dateSort}`;
    }
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  
    if (!response.ok) throw new Error("Network response was not ok");
  
    const data = await response.json();
    const rawResults = Array.isArray(data) ? data : data.ma || [];
  
    // Optional: If filtering for today only, enforce it manually
    if (daysBack === 0) {
      const today = toFormatted;
      return rawResults.filter((item) => item.date === today);
    }
  
    return rawResults;
  };
  
  
  export const normalizeResult = (item) => ({
    company: item.acquirer_name,
    symbol: item.acquirer_ticker,
    acquirerExchange: item.acquirer_exchange,
    target: item.target_name,
    targetSymbol: item.target_ticker,
    targetExchange: item.target_exchange,
    date: item.date,
    dateCompleted: item.date_completed,
    dateExpected: item.date_expected,
    dealSize: item.deal_size,
    currency: item.currency,
    paymentType: item.deal_payment_type,
    dealStatus: item.deal_status,
    dealTerms: item.deal_terms_extra,
    dealType: item.deal_type,
    importance: item.importance,
    notes: item.notes,
  });