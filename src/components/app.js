import React, { Suspense, lazy } from 'react';
import { Router, Link } from '@reach/router';

const SignInPage = lazy(() => import('./session/sign-in-page'));
const SignUpPage = lazy(() => import('./session/sign-up-page'));

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> <Link to="/sign-in">Sign in</Link>{' '}
          <Link to="/sign-up">Sign up</Link>
        </nav>
      </header>

      <main>
        <Suspense fallback={'loading...'}>
          <Router>
            <SignInPage path="/sign-in" />
            <SignUpPage path="/sign-up" />
          </Router>
        </Suspense>
      </main>
      <footer />
    </div>
  );
};

export default App;
