import { useMemo, useState } from 'react';

import { CustomButton } from './components/CustomButton';
import { Header } from './components/Header/Header';
import { Layout } from './components/Layout';
import { ModalForm } from './components/ModalForm/ModalForm';
import { Table } from './components/Table/Table';
import { useGetCurrenciesQuery } from './store/api/currencyApi';
import { useAppDispatch } from './store/hooks';
import { toggleModalOpen } from './store/modal/slice';

function App() {
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    dispatch(toggleModalOpen());
  };

  const { data: currencies = [], isLoading } = useGetCurrenciesQuery();

  const [selectedCurrency, setSelectedCurrency] = useState<string>(currencies[0]?._id);

  const currency = currencies.find((c) => c._id === selectedCurrency);
  console.log(
    '🚀 ~ file: App.tsx:22 ~ App ~ selectedCurrency:',
    selectedCurrency,
    'currency',
    currency,
  );

  return (
    <Layout currencies={currencies} setSelectedCurrency={setSelectedCurrency}>
      <ModalForm />
      {!currencies.length && <CustomButton onClick={toggleModal} />}
      {currency && <Table currency={currency} />}
    </Layout>
  );
}

export default App;
