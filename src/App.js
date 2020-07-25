import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import FrontPageRouter from 'components/routers/FrontPageRouter';
import { ToastProvider } from 'react-toast-notifications';
import 'assets/sass/App.scss';

function App() {
  return (
    <ToastProvider>
      <Helmet>
        <title>Ballers | Become A Landlord</title>
      </Helmet>
      <Router primary={false}>
        <FrontPageRouter path="/*" />
      </Router>
    </ToastProvider>
  );
}

export default App;
