import React, { FC } from 'react';

import { Currency } from '../../store/api/currencyApi';

type Props = {
  currency: Currency;
};

const CurrencyOption: FC<Props> = ({ currency }) => (
  <div className="flex items-center">
    <img src={currency.imageUrl} alt={currency.name} className="w-8 h-8 mr-2" />
    {currency.name}
  </div>
);

export default CurrencyOption;
