import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import { getProxy } from 'utils/helpers';
import { Link } from '@reach/router';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import Input from 'components/forms/Input';
import { feedback } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { loginSchema } from 'components/forms/schemas/userSchema';
import AlertMessage from 'components/utils/AlertMessage';

const Login = () => (
  <>
    <Header />
    <Content />
    <Footer />
  </>
);
const Content = ({ redirectTo, sid, token }) => {
  return (
    <section>
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-lg-5 mx-auto">
            <div className="card p-5 my-6">
              <section>
                <h4>Login</h4>
                <p className="mb-5">
                  Sign in to access your profile, rewards and contributions.
                </p>
                <LoginForm redirectTo={redirectTo} sid={sid} token={token} />
              </section>
              <section className="auth__social-media">
                <a
                  className="auth__social-media--icons"
                  href={`${getProxy()}/api/v1/auth/google`}
                >
                  <span className="icon-google" />
                </a>
                {/* <a
                  className="auth__social-media--icons"
                  href={`${getProxy()}/api/v1/auth/facebook`}
                >
                  <span className="icon-facebook-official" />
                </a> */}
              </section>
              <section className="auth__footer">
                <div className="register mt-6 text-center">
                  Not Registered?{' '}
                  <Link className="auth__link" to="/register">
                    {' '}
                    Create Account
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
        <p />
      </div>
    </section>
  );
};

Content.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const LoginForm = ({ redirectTo, sid, token }) => {
  const [message, setMessage] = React.useState(null);
  // const { userState, userDispatch } = React.useContext(UserContext);

  // CHECK TOKEN ACTIVATION
  React.useEffect(() => {
    token &&
      Axios.get('/api/v1/users/activate', { params: { token } })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            console.log('data', data);
            // setMessage({
            //   type: 'success',
            //   message: data.message,
            // });
          }
        })
        .catch(function (error) {
          // setMessage({
          //   message: error.response.data.message,
          // });
        });
  }, [token]);

  // CHECK IF SOCIAL MEDIA LOGIN
  // React.useEffect(() => {
  //   sid &&
  //     axios
  //       .get('/api/v1/who-am-i', {
  //         headers: {
  //           'x-access-token': sid,
  //         },
  //       })
  //       .then(function (response) {
  //         const { status, data } = response;

  //         // handle success
  //         if (status === 200) {
  //           if (data.type === USER_TYPES.unknown) {
  //             navigate(`/complete-registration/${sid}`);
  //           } else {
  //             userDispatch({ type: 'user-social-media-login', user: data });
  //             storeToken(sid);
  //             storeUserType(data.type);
  //           }
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log('error', error);
  //         setMessage({
  //           message: error.response.data.message,
  //         });
  //       });
  // }, [sid, userDispatch]);

  // CHECK IF USER HAS SIGNED IN
  // React. useEffect(() => {
  //   if (
  //     userState &&
  //     userState.isLoggedIn &&
  //     userState.type !== USER_TYPES.unknown
  //   ) {
  //     const dashboardUrl = `/${DASHBOARD_PAGE[userState.type]}/dashboard`;
  //     navigate(redirectTo || dashboardUrl);
  //   }
  // }, [userState, redirectTo]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        // post to api
        setMessage({ message: 'Testing ' });
        // Axios.post('/api/v1/users/login', values)
        //   .then(function (response) {
        //     const { status, data } = response;
        //     if (status === 200) {
        //       console.log('data', data);
        //       setMessage('Testing');
        //       // userDispatch({ type: 'user-login', user: data.user });
        //       // storeToken(data.token);
        //       // storeUserType(data.user.type);
        //     }
        //   })
        //   .catch(function (error) {
        //     // setMessage({
        //     //   message: error.response.data.message,
        //     // });
        //   });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => {
        const submitFormWithEnterKey = (event) => {
          if (event.keyCode === 13) {
            handleSubmit();
          }
        };
        return (
          <Form>
            <AlertMessage {...message} />
            <Input
              label="Email"
              name="email"
              onKeyDown={(e) => submitFormWithEnterKey(e)}
              placeholder="Email Address"
              showFeedback={feedback.NONE}
              tabIndex={1}
            />
            <Input
              label="Password"
              labelClassName="d-block"
              labelLink={{
                to: '/forgot-password',
                text: 'Forgot Password',
              }}
              name="password"
              onKeyDown={(evt) => submitFormWithEnterKey(evt)}
              placeholder="Password"
              showFeedback={feedback.NONE}
              tabIndex={2}
              type="password"
            />
            <Button loading={isSubmitting} onClick={handleSubmit}>
              Sign in
            </Button>
          </Form>
        );
      }}
      validationSchema={createSchema(loginSchema)}
    />
  );
};

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
  sid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  redirectTo: '',
};
export default Login;
