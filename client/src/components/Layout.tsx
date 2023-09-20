import { FC, ReactNode } from 'react';

import { Currency } from '../store/api/currencyApi';
import { Header } from './Header/Header';

type Props = {
  children: ReactNode;
  currencies: Currency[];
  setSelectedCurrency: (value: string) => void;
};

export const Layout: FC<Props> = ({ children, currencies, setSelectedCurrency }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-r from-violet-500 to-orange-500">
      {currencies.length && (
        <Header setSelectedCurrency={setSelectedCurrency} currencies={currencies} />
      )}
      <div className="h-full w-full flex grow-1 justify-center align-center">
        {children}
      </div>
    </div>
  );
};
