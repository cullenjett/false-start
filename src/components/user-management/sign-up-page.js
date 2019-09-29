import React from 'react';
import { Link, navigate } from '@reach/router';

import { Form, Field } from '../form';
import InputField from '../inputs/input-field';

const SignInPage = () => {
  const handleSubmit = () => {
    return Promise.resolve().then(() => navigate('/'));
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

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
