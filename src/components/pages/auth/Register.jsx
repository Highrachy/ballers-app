import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
// import { getProxy } from 'utils/helpers';
import { Link } from '@reach/router';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import Input from 'components/forms/Input';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { registerSchema } from 'components/forms/schemas/userSchema';
import AlertMessage from 'components/utils/AlertMessage';
import CheckboxGroup from 'components/forms/CheckboxGroup';
import { EmptyTitleSection } from 'components/common/TitleSection';

const Register = () => (
  <>
    <Header />
    <EmptyTitleSection>
      <Content />
    </EmptyTitleSection>
    <Footer />
  </>
);

const Content = ({ redirectTo, sid, token }) => {
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 auth__text">
            <h1>
              Create a <br /> free account
            </h1>
            <p className="lead">
              Register to access your profile, rewards and contributions.
            </p>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="card p-5 my-6">
              <RegisterForm redirectTo={redirectTo} sid={sid} token={token} />
              <section className="auth__social-media">
                {/* <a
                  className="auth__social-media--icons"
                  href={`${getProxy()}/api/v1/auth/google`}
                >
                  <span className="icon-google" />
                </a> */}
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

const RegisterForm = ({ type }) => {
  const [message, setMessage] = React.useState(null);
  const agreementText = (
    <small>
      I agree to the terms listed in the{' '}
      <a href="/terms-of-use" target="_blank">
        Ballers Terms of Use
      </a>{' '}
      and acknowledge the{' '}
      <a href="/privacy-policy" target="_blank">
        Ballers Privacy Policy
      </a>
      .
    </small>
  );
  return (
    <Formik
      initialValues={setInitialValues(registerSchema, { agreement: [] })}
      onSubmit={(values, actions) => {
        delete values.agreement;
        Axios.post('/api/v1/users', values)
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'success',
                message: `Your registration is successful. Kindly activate your account by clicking on the confirmation link sent to your inbox (${values.email}).`,
              });
              actions.resetForm();
            }
          })
          .catch(function (error) {
            setMessage({
              message: error.response.data.message,
              lists:
                error.response.data.errors &&
                Object.values(error.response.data.errors),
            });
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <section className="auth__social-media text-center">
            {/* <p className="auth__social-media--text">Register with:</p>
            <a
              className="auth__social-media--icons"
              href={`${getProxy()}/api/v1/auth/google`}
            >
              <span className="icon-google" />
            </a> */}
            {/* <a
              className="auth__social-media--icons"
              href={`${getProxy()}/api/v1/auth/facebook`}
            >
              <span className="icon-facebook-official" />
            </a> */}
            {/* <p className="auth__social-media--text mt-0 mb-5">OR</p> */}
          </section>
          <div className="mt-3 d-none d-md-block">
            <AlertMessage {...message} />
          </div>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="First Name looks good"
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Last Name looks good"
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Email address seems valid"
              label="Email"
              name="email"
              placeholder="Email Address"
            />
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Phone number looks good"
              label="Phone"
              name="phoneNumber"
              placeholder="Phone"
            />
          </div>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Password seems good"
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Awesome. Password matches"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          <div className="form-row ml-0">
            <CheckboxGroup
              custom
              inline
              name="agreement"
              options={[{ label: agreementText, value: true }]}
            />
            <label className="form-check-label" htmlFor="agreement"></label>
          </div>
          <div className="mt-3 d-block d-md-none">
            <AlertMessage {...message} />
          </div>
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <DisplayFormikState {...props} hide showAll />
        </Form>
      )}
      validationSchema={createSchema(registerSchema)}
    />
  );
};
export default Register;
