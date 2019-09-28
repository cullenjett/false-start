import React from 'react';
import { Link } from '@reach/router';

const SignInPage = () => {
  return (
    <>
      <h1>Create an account</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>

      <p>
        Already have an account?
        <Link to="/sign-in">Sign in here</Link>
      </p>
    </>
  );
};

export default SignInPage;
