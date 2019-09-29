import React from 'react';
import { Link } from '@reach/router';

import { Form, Field } from '../form';
import InputField from '../inputs/input-field';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SignInPage = () => {
  return (
    <>
      <h1>Sign in</h1>

      <Form
        onSubmit={() => {
          return sleep(1000).then(() => {
            return {
              email: 'That email is already taken',
            };
          });
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Email is required';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Field
              label="Email address"
              name="email"
              type="email"
              component={InputField}
              data-testid="email-input"
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
        Don't have an account? <Link to="/sign-up">Register here</Link>
      </p>
    </>
  );
};

export default SignInPage;
