import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import MainNav from './navigation/app-nav';

const SignInPage = lazy(() => import('./user-management/sign-in-page'));
const SignUpPage = lazy(() => import('./user-management/sign-up-page'));

const App = () => {
  return (
    <div>
      <MainNav />

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
