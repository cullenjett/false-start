import React from 'react';
import { Link, navigate } from '@reach/router';

import { Form, Field } from '../form';
import InputField from '../inputs/input-field';
import { valid, required, email } from '../../utils/validation';

const SignInPage = () => {
  const handleSubmit = () => {
    return Promise.resolve().then(() => navigate('/'));
  };

  const validate = (values) => {
    const errors = {};

    errors.name = valid(required('Name is required'))(values.name);
    errors.email = valid(required('Email is required'), email())(values.email);
    errors.password = valid(required('Password is required'))(values.password);

    return errors;
  };

  return (
    <>
      <h1>Create an account</h1>

      <Form
        onSubmit={handleSubmit}
        validate={validate}
        style={{ maxWidth: 400 }}
      >
        {({ isSubmitting }) => (
          <>
            <Field
              label="Name"
              name="name"
              type="text"
              component={InputField}
              autoComplete="off"
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              component={InputField}
              autoComplete="off"
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={InputField}
              autoComplete="off"
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </>
        )}
      </Form>

      <p>
        Already have an account? <Link to="/sign-in">Sign in here</Link>
      </p>
    </>
  );
};

export default SignInPage;
