import React, { useState } from 'react';

// Sample currency data (replace with your actual data)
const currencyList = [
  { name: 'Bitcoin', icon: 'BTC' },
  { name: 'Ethereum', icon: 'ETH' },
  { name: 'Ripple', icon: 'XRP' },
];

export const Header: React.FC = () => {
  // State to store the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BTC');

  // State to store the amount in USDT for the selected currency (replace with actual amount)
  const [usdtAmount, setUsdtAmount] = useState<number>(10000);

  // Function to handle currency selection
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCurrency(selectedValue);
    // Fetch the amount in USDT for the selected currency (you can replace this with your logic)
    // For now, just set a placeholder amount
    setUsdtAmount(5000);
  };

  return (
    <header className="w-full flex shrink-1 bg-gradient-to-r from-yellow-300 via-red-500 to-pink-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Part */}
        <div className="flex items-center space-x-4">
          <label htmlFor="currency" className="text-white font-semibold">
            Select Currency:
          </label>
          <select
            id="currency"
            name="currency"
            className="px-2 py-1 border border-white rounded-md bg-transparent text-white focus:outline-none"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            {currencyList.map((currency) => (
              <option key={currency.icon} value={currency.icon}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Middle Part */}
        <div className="text-white font-semibold">
          USDT Amount: <span className="text-yellow-300">{usdtAmount}</span>
        </div>

        {/* Right Part */}
        <button className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white focus:outline-none">
          Add Values
        </button>
      </div>
    </header>
  );
};
