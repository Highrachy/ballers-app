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
import {
  createSchema,
  addressSchema,
} from 'components/forms/schemas/schema-helpers';
import {
  registerSchema,
  personalInfoSchema,
  changePasswordSchema,
} from 'components/forms/schemas/userSchema';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import Address from 'components/utils/Address';
import { feedback } from 'components/forms/form-helper';
import { getError } from 'utils/helpers';

const Settings = () => (
  <BackendPage>
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
  </BackendPage>
);

const ProfileForm = () => {
  const [toast, setToast] = useToast();
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <section className="row">
      <div className="col-md-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            ...setInitialValues(personalInfoSchema, userState),
            address: setInitialValues(addressSchema, userState.address),
          }}
          onSubmit={(values, actions) => {
            const payload = { ...values };
            !payload.address.street2 && delete payload.address.street2;

            delete Axios.put(`${BASE_API_URL}/user/update`, values, {
              headers: { Authorization: getTokenFromStore() },
            })
              .then(function (response) {
                const { status, data } = response;
                if (status === 200) {
                  userDispatch({
                    type: 'user-profile-update',
                    user: data.updatedUser,
                  });
                  setToast({
                    type: 'success',
                    message: `Your profile has been successfully updated`,
                  });
                  actions.setSubmitting(false);
                }
              })
              .catch(function (error) {
                setToast({
                  message: getError(error),
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema({
            ...personalInfoSchema,
            address: createSchema(addressSchema),
          })}
          // address: createSchema(addressSchema),
          // }
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
                  isValidMessage="Phone number looks good"
                  label="Phone"
                  name="phone"
                  placeholder="Phone"
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Phone number looks good"
                  label="Alternative Phone"
                  name="phone2"
                  optional
                  placeholder="Alternative Phone"
                />
              </div>

              <Address />
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

            Axios.post(`${BASE_API_URL}/user/register`, values)
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
                  message: getError(error),
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
          initialValues={setInitialValues(changePasswordSchema)}
          onSubmit={(values, actions) => {
            Axios.put(`${BASE_API_URL}/user/change-password`, values, {
              headers: { 'x-access-token': getTokenFromStore() },
            })
              .then(function (response) {
                const { status } = response;
                if (status === 200) {
                  setToast({
                    type: 'success',
                    message: `Your password has been successfully updated`,
                  });
                  actions.setSubmitting(false);
                  actions.resetForm();
                }
              })
              .catch(function (error) {
                setToast({
                  message: getError(error),
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema(registerSchema)}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <Toast {...toast} />
              <Input
                isValidMessage="Password seems good"
                label="Old Password"
                name="oldPassword"
                placeholder="Old Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Input
                isValidMessage="Password seems good"
                label="New Password"
                name="password"
                placeholder="New Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Input
                isValidMessage="Password matches"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Button
                className="btn-danger btn-wide btn-transparent mt-3"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Password
              </Button>
              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default Settings;
