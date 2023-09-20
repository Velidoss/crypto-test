import { Field, Form, Formik } from 'formik';
import { FC, ReactNode } from 'react';
import * as Yup from 'yup';

import { useAddCurrencyMutation } from '../../store/api/currencyApi';

type FormValues = {
  name: string;
  image?: File;
};

type Props = {
  handleClose: () => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.mixed().required('Image is required'),
});

export const AddCurrencyForm: FC<Props> = ({ handleClose }) => {
  const [addCurrency] = useAddCurrencyMutation();

  const handleFormSubmit = async (values: { name: string; image: File }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);

    addCurrency(formData);

    handleClose();
  };

  const initialValues: FormValues = { name: '', image: undefined };

  return (
    <Formik
      initialValues={initialValues as { name: string; image: File }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className={`border rounded w-full py-2 px-3 ${
                errors.name && touched.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && touched.name && (
              <div className="text-red-500 mt-1">{errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-semibold mb-2">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              // set supported file types here,
              // could also check again within formik validation or backend
              accept="image/png, .svg"
              className={`border w-full py-2 px-3 ${
                errors.image && touched.image ? 'border-red-500' : ''
              }`}
              onChange={(e) => {
                if (e.currentTarget.files) {
                  setFieldValue('image', e.currentTarget.files[0]);
                }
              }}
            />
            {errors.image && touched.image && (
              <div className="text-red-500 mt-1">{errors.image as ReactNode}</div>
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
