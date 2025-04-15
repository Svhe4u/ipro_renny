// src/app/components/RegisterForm.tsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
      .required('Required'),
    city: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
        city: values.city,
        postal_code: values.postalCode,
        address: values.address,
        password: values.password,
      });

      if (response.status === 201) {
        router.push('/login'); // Redirect to login page after successful registration
      }
    } catch (error: any) {
      if (error.response) {
        setServerError(error.response.data.message || 'Registration failed');
      } else {
        setServerError('Network error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">PERSONAL</h2>
        <div className="mt-4">
          <button 
            type="button" 
            className="text-blue-600 underline"
            onClick={() => document.getElementById('profilePicture')?.click()}
          >
            Change Photo
          </button>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              // Handle file upload here
              if (e.target.files && e.target.files[0]) {
                // You would typically upload this to your backend
                console.log('Selected file:', e.target.files[0]);
              }
            }}
          />
        </div>
      </div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          postalCode: '',
          address: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            {serverError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className={`mt-1 block w-full border ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  placeholder="First Name"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className={`mt-1 block w-full border ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  placeholder="Last Name"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <Field
                  name="city"
                  type="text"
                  className={`mt-1 block w-full border ${errors.city && touched.city ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  placeholder="City"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <Field
                  name="postalCode"
                  type="text"
                  className={`mt-1 block w-full border ${errors.postalCode && touched.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  placeholder="Postal Code"
                />
                <ErrorMessage name="postalCode" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Field
                name="address"
                type="text"
                className={`mt-1 block w-full border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                placeholder="Address"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`mt-1 block w-full border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Field
                  name="phone"
                  type="tel"
                  className={`mt-1 block w-full border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  placeholder="Phone"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className={`mt-1 block w-full border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className={`mt-1 block w-full border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <p className="text-sm text-gray-600">
              Use this email to log in to your <strong>cvtoolspro.com</strong> account and receive notifications.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              {isSubmitting ? 'Processing...' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;