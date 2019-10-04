import React, { Component } from 'react';

import { log } from '../utils/log';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err) {
    log({
      err,
    });
  }

  render() {
    if (this.state.hasError === null) {
      return this.props.children;
    }

    return (
      <main>
        <h1>Something went wrong</h1>
      </main>
    );
  }
}

export default ErrorBoundary;
