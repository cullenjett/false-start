import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { Form, Field } from '../form';
import InputField from '../inputs/input-field';
import { signIn } from '../../actions/session-actions';
import { valid, required, email } from '../../utils/validation';

const SignInPage = ({ signIn }) => {
  const handleSubmit = (formValues) => {
    return signIn({
      email: formValues.email,
      password: formValues.password,
    });
  };

  const validate = (values) => {
    const errors = {};

    errors.email = valid(required('Email is required'), email())(values.email);
    errors.password = valid(required('Password is required'))(values.password);

    return errors;
  };

  return (
    <>
      <h1>Sign in</h1>

      <div style={{ maxWidth: 400 }}>
        <Form onSubmit={handleSubmit} validate={validate}>
          {({ isSubmitting }) => (
            <>
              <Field
                label="Email address"
                className="foo"
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
      </div>

      <p>
        Don't have an account? <Link to="/sign-up">Register here</Link>
      </p>
    </>
  );
};

export default connect(
  null,
  {
    signIn,
  }
)(SignInPage);
