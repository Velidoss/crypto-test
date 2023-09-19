import { Field, Form, Formik } from 'formik';
import React, { ReactNode, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { isMOdalOpenSeelctor, toggleModalOpen } from '../../store/modal/slice';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.mixed().required('Image is required'),
});

interface ApiResponse {
  message: string;
  // Add other properties from your API response if needed
}

type FormValues = {
  name: string;
  image?: File;
};

export const ModalForm: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(isMOdalOpenSeelctor);
  const parent = useRef(null);

  const handleClose = () => {
    dispatch(toggleModalOpen());
  };

  const handleFormSubmit = async (values: { name: string; image: File }) => {
    // Handle form submission, e.g., dispatch an action to save the data
    console.log('Form data:', values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);

    try {
      const response = await fetch('http://localhost:8080/api/add-currency', {
        method: 'POST',
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        // body: JSON.stringify({
        //   name: values.name,
        //   image: formData.image
        // }),
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        console.log('API Response:', data);
        // setApiResponse(data);

        // Handle any further logic here, such as resetting the form or displaying a success message.
      } else {
        console.error('API Error:', response.statusText);

        // Handle error, e.g., display an error message to the user.
      }
      // Handle any further logic here, such as resetting the form or displaying a success message.
    } catch (error) {
      console.error('API Error:', error);

      // Handle error, e.g., display an error message to the user.
    }

    // Close the modal
    handleClose();
  };

  const initialValues: FormValues = { name: '', image: undefined };

  return isOpen ? (
    <div
      ref={parent}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Item</h2>
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
                {/* <Field
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, .svg"
                  value={values.image}
                  className={`border w-full py-2 px-3 ${
                    errors.image && touched.image ? 'border-red-500' : ''
                  }`}
                  onChange={(event: { currentTarget: { files: any[]; }; }) => {
                    if (event.currentTarget.files) {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }
                  }}
                /> */}
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
                    // Object is possibly null error w/o check
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
      </div>
    </div>
  ) : null;
};