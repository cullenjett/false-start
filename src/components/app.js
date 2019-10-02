import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import AppNav from './navigation/app-nav';

const HomePage = lazy(() => import('./home-page'));
const SignInPage = lazy(() => import('./user-management/sign-in-page'));
const SignUpPage = lazy(() => import('./user-management/sign-up-page'));

const App = () => {
  return (
    <div>
      <AppNav />

      <br />

      <main>
        <Suspense fallback={'loading...'}>
          <Router>
            <HomePage path="/" />
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
