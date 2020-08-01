import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, Tabs, Tab } from 'react-bootstrap';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import Input from 'components/forms/Input';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { registerSchema } from 'components/forms/schemas/userSchema';

const Transactions = () => (
  <BackendPage>
    <Profile />
  </BackendPage>
);

const Profile = () => (
  <div className="container-fluid">
    <Card className="card-container">
      <Tabs defaultActiveKey="0">
        <Tab eventKey="0" title="Profile">
          <div className="card-tab-content py-5">
            <ProfileForm />
          </div>
        </Tab>
        <Tab eventKey="1" title="Property Preference">
          <div className="card-tab-content py-5">
            <PropertyPreferenceForm />
          </div>
        </Tab>
        <Tab eventKey="2" title="Change Password">
          <div className="card-tab-content py-5">
            <ChangePasswordForm />
          </div>
        </Tab>
      </Tabs>
    </Card>
  </div>
);

const ProfileForm = () => {
  const [toast, setToast] = useToast();
  return (
    <section className="row">
      <div className="col-md-10">
        <Formik
          initialValues={setInitialValues(registerSchema, { agreement: [] })}
          onSubmit={(values, actions) => {
            delete values.agreement;

            Axios.post(
              'https://staging-ballers-api.herokuapp.com/api/v1/user/register',
              values
            )
              .then(function (response) {
                const { status } = response;
                if (status === 200) {
                  setToast({
                    type: 'success',
                    message: `Your registration is successful. Kindly activate your account by clicking on the confirmation link sent to your inbox (${values.email}).`,
                  });
                  actions.setSubmitting(false);
                  actions.resetForm();
                }
              })
              .catch(function (error) {
                setToast({
                  message: error.response.data.message,
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema(registerSchema)}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <Toast {...toast} />
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
                  name="phone"
                  placeholder="Phone"
                />
              </div>
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

const PropertyPreferenceForm = () => {
  const [toast, setToast] = useToast();
  return (
    <section className="row">
      <div className="col-md-10">
        <Formik
          initialValues={setInitialValues(registerSchema, { agreement: [] })}
          onSubmit={(values, actions) => {
            delete values.agreement;

            Axios.post(
              'https://staging-ballers-api.herokuapp.com/api/v1/user/register',
              values
            )
              .then(function (response) {
                const { status } = response;
                if (status === 200) {
                  setToast({
                    type: 'success',
                    message: `Your registration is successful. Kindly activate your account by clicking on the confirmation link sent to your inbox (${values.email}).`,
                  });
                  actions.setSubmitting(false);
                  actions.resetForm();
                }
              })
              .catch(function (error) {
                setToast({
                  message: error.response.data.message,
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema(registerSchema)}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <Toast {...toast} />
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="State looks good"
                  label="State"
                  name="state"
                  placeholder="Select State"
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Area looks good"
                  label="Area"
                  name="area"
                  placeholder="Area"
                />
              </div>
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="House Type seems valid"
                  label="HouseType"
                  name="houseType"
                  placeholder="Select House Type"
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Budget looks good"
                  label="Budget"
                  name="budget"
                  placeholder="budget"
                />
              </div>
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

const ChangePasswordForm = () => {
  const [toast, setToast] = useToast();
  return (
    <section className="row">
      <div className="col-md-10">
        <Formik
          initialValues={setInitialValues(registerSchema, { agreement: [] })}
          onSubmit={(values, actions) => {
            delete values.agreement;

            Axios.post(
              'https://staging-ballers-api.herokuapp.com/api/v1/user/register',
              values
            )
              .then(function (response) {
                const { status } = response;
                if (status === 200) {
                  setToast({
                    type: 'success',
                    message: `Your registration is successful. Kindly activate your account by clicking on the confirmation link sent to your inbox (${values.email}).`,
                  });
                  actions.setSubmitting(false);
                  actions.resetForm();
                }
              })
              .catch(function (error) {
                setToast({
                  message: error.response.data.message,
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema(registerSchema)}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <Toast {...toast} />
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Old Password looks good"
                  label="Old Password"
                  name="oldPassword"
                  placeholder="Old Password"
                />
              </div>
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="New Password number looks good"
                  label="New Password"
                  name="New Password"
                  placeholder="New Password"
                />
              </div>
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default Transactions;
