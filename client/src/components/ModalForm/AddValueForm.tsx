import 'react-datepicker/dist/react-datepicker.css';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import { FC, ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';

import { useAddCurrencyValueMutation } from '../../store/api/currencyApi';
import { useAppSelector } from '../../store/hooks';
import { currencyIdSelector } from '../../store/modal/slice';

type FormValues = {
  amount: number;
  time: Date;
};

type Props = {
  handleClose: () => void;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required('Amount is required'),
  time: Yup.mixed().required('Image is required'),
});

export const AddValueForm: FC<Props> = ({ handleClose }) => {
  const [addValue] = useAddCurrencyValueMutation();

  const currencyId = useAppSelector(currencyIdSelector);
  console.log('🚀 ~ file: AddValueForm.tsx:30 ~ currencyId:', currencyId);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleFormSubmit = async ({ amount, time }: { amount: number; time: Date }) => {
    console.log('🚀 ~ file: AddValueForm.tsx:43 ~ handleFormSubmit ~ time:', time);
    if (currencyId) {
      addValue({
        id: currencyId,
        amount,
        time: formatDate(time),
      });
    }

    handleClose();
  };

  const initialValues: FormValues = { amount: 0, time: new Date() };

  return (
    <Formik
      initialValues={
        initialValues as {
          amount: number;
          time: Date;
        }
      }
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="amount">Amount:</label>
            <Field
              className={`border rounded w-full py-2 px-3 ${
                errors.amount && touched.amount ? 'border-red-500' : ''
              }`}
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
            />
            {errors.amount && touched.amount && (
              <div className="text-red-500 mt-1">{errors.amount}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="time">Date:</label>
            <Field name="time">
              {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
              {({ field, form }: FieldAttributes<any>) => (
                <DatePicker
                  id="time"
                  className={`border rounded w-full py-2 px-3 ${
                    errors.time && touched.time ? 'border-red-500' : ''
                  }`}
                  selected={field.value}
                  onChange={(date: Date) => form.setFieldValue('time', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="dd.MM.yyyy HH:mm"
                />
              )}
            </Field>
            {errors.time && touched.time && (
              <div className="text-red-500 mt-1">{errors.time as ReactNode}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="ml-2 border px-4 py-2 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};
