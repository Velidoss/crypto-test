import { CustomButton } from './components/CustomButton';
import { Layout } from './components/Layout';
import { ModalForm } from './components/ModalForm/ModalForm';
import { useAppDispatch } from './store/hooks';
import { toggleModalOpen } from './store/modal/slice';

function App() {
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    dispatch(toggleModalOpen());
  };

  return (
    <Layout>
      <ModalForm />
      <CustomButton onClick={toggleModal} />
    </Layout>
  );
}

export default App;
