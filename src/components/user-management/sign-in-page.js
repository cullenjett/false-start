import React from 'react';
import { Link } from '@reach/router';

import Form, { Field } from '../form/form';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const InputField = (props) => {
  console.log(`${props.input.name} component render`);
  const hasError = props.meta.submitFailed && props.meta.error;
  return (
    <div>
      <label>{props.label}</label>
      <br />
      <input {...props.input} style={{ borderColor: hasError && 'tomato' }} />
      {hasError && <p style={{ color: 'tomato' }}>{props.meta.error}</p>}
    </div>
  );
};

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

        <button type="submit">Submit</button>
      </Form>

      <p>
        Don't have an account? <Link to="/sign-up">Register here</Link>
      </p>
    </>
  );
};

export default SignInPage;
