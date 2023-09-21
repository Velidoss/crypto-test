import { FC, ReactNode } from 'react';

import { Currency } from '../store/api/currencyApi';
import { Header } from './Header/Header';

type Props = {
  children: ReactNode;
  currencies: Currency[];
  selectedCurrency?: Currency;
};

export const Layout: FC<Props> = ({ children, currencies, selectedCurrency }) => {
  return (
    <div className="min-h-screen overflow-auto w-full flex flex-col items-center justify-start bg-gradient-to-r from-lime-200 to-amber-100">
      {currencies.length && (
        <Header selectedCurrency={selectedCurrency} currencies={currencies} />
      )}
      <div className="h-full w-full flex grow-1 justify-center align-center">
        {children}
      </div>
    </div>
  );
};
