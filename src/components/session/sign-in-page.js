import React from 'react';
import { Link } from '@reach/router';

const SignInPage = () => {
  return (
    <>
      <h1>Sign in</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>

      <p>
        Don't have an account?
        <Link to="/sign-up">Register here</Link>
      </p>
    </>
  );
};

export default SignInPage;
