import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import FrontPageRouter from 'components/routers/FrontPageRouter';
import UserRouter from 'components/routers/UserRouter';
import 'assets/sass/App.scss';
import { HomeKeeping } from 'components/utils/HomeKeeping';
import { UserContextProvider } from 'context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Helmet>
        <title>Ballers | Become A Landlord</title>
      </Helmet>
      <Router primary={false}>
        <HomeKeeping path="/">
          <FrontPageRouter path="/*" />
          <UserRouter path="/user/*" />
        </HomeKeeping>
      </Router>
    </UserContextProvider>
  );
}

export default App;
