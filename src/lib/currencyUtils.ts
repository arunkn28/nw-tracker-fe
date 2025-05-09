// Export currencies for use in multiple files
export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
];

/**
 * Get the symbol for a currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = currencies.find((c) => c.code === currencyCode);
  return currency?.symbol || "$"; // Default to $ if currency not found
}

/**
 * Format a number as currency with the provided currency code
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  
  return `${symbol}${amount.toLocaleString()}`;
} 