import { Field, Form, Formik } from 'formik';
import React, { ReactNode, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useAddCurrencyMutation } from '../../store/api/currencyApi';
import { useAppSelector } from '../../store/hooks';
import {
  closeModal,
  isMOdalOpenSeelctor as isModalOpenSeelctor,
  modalTypeSelector,
  toggleModalOpen,
} from '../../store/modal/slice';
import { AddCurrencyForm } from './AddCurrencyForm';
import { AddValueForm } from './AddValueForm';

export const ModalForm: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector(isModalOpenSeelctor);
  const type = useAppSelector(modalTypeSelector);
  const parent = useRef(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return isOpen ? (
    <div
      ref={parent}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Item</h2>
        {type === 'currency' && <AddCurrencyForm handleClose={handleClose} />}
        {type === 'value' && <AddValueForm handleClose={handleClose} />}
      </div>
    </div>
  ) : null;
};
