import React, { useEffect } from 'react';
import store from 'store2';
import { UserContext } from 'context/UserContext';
import BackendPage from 'components/layout/BackendPage';
import { navigate } from '@reach/router';

const Logout = () => {
  const { userDispatch } = React.useContext(UserContext);

  useEffect(() => {
    store(false);
    userDispatch({ type: 'user-logout' });
    navigate('/');
    // window.location.href = '/';
  }, [userDispatch]);

  return (
    <BackendPage title="Log Out">
      <div className="main-app">
        <section className="app-content">Logging out</section>
      </div>
    </BackendPage>
  );
};

export default Logout;
