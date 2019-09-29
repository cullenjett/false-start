import React from 'react';
import { Link } from '@reach/router';

import styles from './sign-up-page.module.css';

const SignInPage = () => {
  return (
    <>
      <h1>Create an account</h1>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className={styles.label}>Email address</label>
        <input type="email" className={styles.input} />
      </form>

      <p>
        Already have an account? <Link to="/sign-in">Sign in here</Link>
      </p>
    </>
  );
};

export default SignInPage;
