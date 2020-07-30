import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import FrontPageRouter from 'components/routers/FrontPageRouter';
import UserRouter from 'components/routers/UserRouter';
import 'assets/sass/App.scss';

function App() {
  return (
    <>
      <Helmet>
        <title>Ballers | Become A Landlord</title>
      </Helmet>
      <Router primary={false}>
        <FrontPageRouter path="/*" />
        <UserRouter path="/user/*" />
      </Router>
    </>
  );
}

export default App;
