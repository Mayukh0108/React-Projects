import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const api = `https://v6.exchangerate-api.com/v6/def5e25188d2fa72441e0877/latest/${fromCurrency}`;
    setIsLoading(true);
    axios
      .get(api)
      .then((response) => {
        setExchangeRates(response.data.conversion_rates);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangeRates[toCurrency];
    if (conversionRate) {
      setConvertedAmount(amount * conversionRate);
    }
  }, [amount, fromCurrency, exchangeRates, toCurrency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-4xl transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center animate-fade-in">
          💱 Currency Converter
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 ml-1 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full w-fit">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 pr-12"
                placeholder="Enter amount"
                min="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {fromCurrency}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 ml-1 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full w-fit">
              From Currency
            </label>
            <div className="relative">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency} className="flex items-center">
                    {currency}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 ml-1 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full w-fit">
              To Currency
            </label>
            <div className="relative">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              >
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-white shadow-inner text-center animate-fade-in-up">
          <p className="text-sm font-medium text-gray-500 mb-2">Converted Amount</p>
          <div className="flex items-center justify-center space-x-2">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
              </div>
            ) : (
              <>
                <span className="text-3xl font-bold text-gray-800">
                  {convertedAmount.toFixed(2)}
                </span>
                <span className="text-2xl font-semibold text-gray-600">
                  {toCurrency}
                </span>
              </>
            )}
          </div>
          <div className="mt-3 text-sm text-gray-400">
            {!isLoading && `1 ${fromCurrency} = ${(exchangeRates[toCurrency] || 0).toFixed(4)} ${toCurrency}`}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Rates provided by{" "}
          <a 
            href="https://www.exchangerate-api.com" 
            className="text-blue-500 hover:text-blue-700 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Exchange Rate API
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;