import React, { useState } from 'react';
import Select from 'react-select';

import PlusIcon from '../../../resources/plus-svgrepo-com.svg';
import { Currency } from '../../store/api/currencyApi';
import { useAppDispatch } from '../../store/hooks';
import { toggleModalOpen } from '../../store/modal/slice';

// Sample currency data (replace with your actual data)
const currencyList = [
  { name: 'Bitcoin', icon: 'BTC' },
  { name: 'Ethereum', icon: 'ETH' },
  { name: 'Ripple', icon: 'XRP' },
];

type Props = {
  currencies: Currency[];
  setSelectedCurrency: (value: string) => void;
};

export const Header: React.FC<Props> = ({ currencies, setSelectedCurrency }) => {
  const [usdtAmount, setUsdtAmount] = useState<number>(10000);
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    dispatch(toggleModalOpen());
  };

  const handleCurrencyChange = (
    currency: { value: string; label: JSX.Element } | null,
  ): void => {
    if (currency?.value === 'add_currency') {
      toggleModal();
    } else {
      setSelectedCurrency(currency?.value || '');
    }
  };

  const options = [
    {
      value: 'add_currency',
      label: (
        <div className="flex items-center text-black">
          <img src={PlusIcon} alt="add" className="w-8 h-8 mr-2" />
          Add currency
        </div>
      ),
    },
    ...currencies.map((currency) => ({
      value: currency._id,
      label: (
        <div className="flex items-center text-black">
          <img src={currency.imageUrl} alt={currency.name} className="w-8 h-8 mr-2" />
          {currency.name}
        </div>
      ),
    })),
  ];

  return (
    <header className="w-full flex shrink-1 bg-gradient-to-r from-yellow-300 via-red-500 to-pink-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Part */}
        <div className="flex items-center space-x-4">
          <label htmlFor="currency" className="text-white font-semibold">
            Select Currency:
          </label>
          <Select
            defaultValue={options[1]}
            onChange={handleCurrencyChange}
            className="px-2 w-48 min-w-72 py-1 border border-white rounded-md bg-transparent text-white focus:outline-none"
            options={options}
          />
        </div>

        <div className="text-white font-semibold">
          USDT Amount: <span className="text-yellow-300">{usdtAmount}</span>
        </div>

        <button className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white focus:outline-none">
          Add Values
        </button>
      </div>
    </header>
  );
};
