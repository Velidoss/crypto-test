import { Chart } from './components/Chart/Chart';
import { CustomButton } from './components/CustomButton';
import { Layout } from './components/Layout';
import { ModalForm } from './components/ModalForm/ModalForm';
import { Table } from './components/Table/Table';
import { useGetCurrenciesQuery } from './store/api/currencyApi';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { currencyIdSelector, toggleModalOpen } from './store/modal/slice';

function App() {
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    dispatch(toggleModalOpen('currency'));
  };

  const { data: currencies = [] } = useGetCurrenciesQuery();

  const selectedCurrencyId = useAppSelector(currencyIdSelector);

  const currency = currencies.find((c) => c._id === selectedCurrencyId);

  return (
    <Layout currencies={currencies} selectedCurrency={currency}>
      <ModalForm />
      {!currencies.length && (
        <CustomButton onClick={toggleModal}>Add currency</CustomButton>
      )}
      <div className="w-full pl-3 pr-3">
        {currency && <Chart values={currency.values} />}
        {currency && <Table currency={currency} />}
      </div>
    </Layout>
  );
}

export default App;
