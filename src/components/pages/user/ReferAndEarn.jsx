import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
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
import ReferralImage from 'assets/img/refer-n-earn.png';

const ReferAndEarn = () => (
  <BackendPage>
    <div className="col-sm-10 mx-auto">
      <EmailReferral />
      <YourReferralCode />
      <InviteFriendsTable />
    </div>
  </BackendPage>
);

const EmailReferral = () => (
  <div className="container-fluid">
    <h5>Refer your friends and earn more</h5>
    <Card className="mt-4 card-container">
      <section className="row py-4">
        <div className="col-sm-5 my-5">
          <img src={ReferralImage} alt="Referral" className="img-fluid" />
        </div>
        <div className="col-sm-7">
          <p className="text-primary mb-5">
            Refer your friends and earn. We will also give your friends rewards
            because we value your friendship.
          </p>
          <InviteFriendByEmailForm />
        </div>
      </section>
    </Card>
  </div>
);

const InviteFriendByEmailForm = () => {
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
              <Input
                isValidMessage="Email address seems valid"
                name="email"
                placeholder="Email Address"
              />
              <div className="text-center">
                <Button
                  className="btn-secondary mt-1 btn-sm btn-wide"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Invite Friend
                </Button>
              </div>
              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

const YourReferralCode = () => (
  <div className="container-fluid">
    <Card className="mt-4 card-container">
      <section className="row py-4">
        <div className="col-sm-6 my-5">
          <InviteFriendByEmailForm />
        </div>
        <div className="col-sm-6">
          <p className="text-primary">Share:</p>
          <span className="icon-holder">
            <FacebookIcon />
          </span>
          <span className="icon-holder">
            <TwitterIcon />
          </span>
          <span className="icon-holder">
            <WhatsappIcon />
          </span>
          <span className="icon-holder">
            <LinkedInIcon />
          </span>
        </div>
      </section>
    </Card>
  </div>
);

const InviteFriendsTable = () => (
  <div className="container-fluid mt-5">
    <h6>Invited friends</h6>
    <table class="table">
      <tbody>
        <tr>
          <td>1</td>
          <td>Asounju.dadate@gmail.com</td>
          <td className="text-right text-danger">Invite Sent</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Asounju.dadate@gmail.com</td>
          <td className="text-right text-warning">Registered</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Asounju.dadate@gmail.com</td>
          <td className="text-right text-success">Rewarded</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
);

const FacebookIcon = () => (
  <svg
    width={12}
    height={22}
    viewBox="0 0 12 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5629 0.00457747L8.78567 0C5.66551 0 3.64912 2.12509 3.64912 5.41423V7.91055H0.856711C0.615414 7.91055 0.420013 8.1115 0.420013 8.35937V11.9763C0.420013 12.2241 0.615636 12.4249 0.856711 12.4249H3.64912V21.5514C3.64912 21.7993 3.84452 22 4.08582 22H7.72913C7.97043 22 8.16583 21.799 8.16583 21.5514V12.4249H11.4308C11.6721 12.4249 11.8675 12.2241 11.8675 11.9763L11.8688 8.35937C11.8688 8.24036 11.8227 8.12638 11.741 8.04215C11.6592 7.95793 11.5478 7.91055 11.4319 7.91055H8.16583V5.79439C8.16583 4.77727 8.40178 4.26094 9.69159 4.26094L11.5625 4.26025C11.8036 4.26025 11.999 4.0593 11.999 3.81166V0.453169C11.999 0.205757 11.8038 0.00503522 11.5629 0.00457747Z"
      fill="#161D3F"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width={22}
    height={18}
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5 2.77233C20.7271 3.10027 19.8978 3.32267 19.0264 3.42196C19.9161 2.91181 20.5972 2.10263 20.92 1.1414C20.0854 1.61383 19.1642 1.95688 18.1826 2.14285C17.3966 1.33994 16.2785 0.839844 15.0384 0.839844C12.6593 0.839844 10.7303 2.68691 10.7303 4.9637C10.7303 5.2866 10.7683 5.60199 10.8418 5.90357C7.26201 5.73141 4.08768 4.08917 1.96314 1.59372C1.59176 2.20189 1.38049 2.91053 1.38049 3.66697C1.38049 5.09814 2.14161 6.36093 3.2964 7.09973C2.5904 7.07713 1.92639 6.89116 1.34508 6.58205V6.63357C1.34508 8.63141 2.83056 10.2988 4.80024 10.6783C4.43936 10.7713 4.05882 10.8228 3.66514 10.8228C3.38696 10.8228 3.11794 10.7964 2.85417 10.7461C3.40267 12.3859 4.99315 13.5783 6.87756 13.611C5.40388 14.7167 3.54573 15.3739 1.52749 15.3739C1.17976 15.3739 0.837236 15.3537 0.5 15.3173C2.40671 16.4896 4.67036 17.1732 7.10327 17.1732C15.028 17.1732 19.3597 10.8881 19.3597 5.43741L19.3453 4.90341C20.1917 4.32537 20.9239 3.59912 21.5 2.77233Z"
      fill="#161D3F"
    />
  </svg>
);

const WhatsappIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 9.74244C20 15.1231 15.6047 19.4849 10.1818 19.4849C8.46022 19.4849 6.84289 19.0449 5.43578 18.2727L0 20L1.77222 14.7729C0.878222 13.3049 0.363333 11.5831 0.363333 9.74244C0.363333 4.36178 4.75911 0 10.1818 0C15.6051 0 20 4.36178 20 9.74244ZM10.1818 1.55156C5.62978 1.55156 1.92711 5.226 1.92711 9.74244C1.92711 11.5347 2.51133 13.1944 3.49956 14.5447L2.46822 17.5867L5.64044 16.5784C6.94378 17.4342 8.50511 17.9333 10.182 17.9333C14.7333 17.9333 18.4367 14.2593 18.4367 9.74289C18.4367 5.22644 14.7336 1.55156 10.1818 1.55156ZM15.1398 11.9862C15.0791 11.8869 14.9189 11.8269 14.6784 11.7076C14.4376 11.5882 13.254 11.0102 13.034 10.9309C12.8133 10.8513 12.6524 10.8113 12.4922 11.0502C12.332 11.2893 11.8707 11.8269 11.73 11.9862C11.5896 12.146 11.4493 12.166 11.2084 12.0464C10.968 11.9271 10.1927 11.6747 9.27333 10.8613C8.558 10.2284 8.07489 9.44711 7.93444 9.20778C7.79422 8.96889 7.91978 8.83978 8.04 8.72089C8.14844 8.61378 8.28089 8.442 8.40111 8.30267C8.52178 8.16311 8.56178 8.06378 8.64156 7.90422C8.72222 7.74489 8.682 7.60556 8.62156 7.48578C8.56156 7.36644 8.07978 6.19133 7.87933 5.71311C7.67889 5.23533 7.47867 5.31489 7.338 5.31489C7.19778 5.31489 7.03711 5.29489 6.87667 5.29489C6.71622 5.29489 6.45533 5.35467 6.23467 5.59356C6.01422 5.83267 5.39267 6.41044 5.39267 7.58533C5.39267 8.76044 6.25467 9.89578 6.37533 10.0549C6.49556 10.214 8.03978 12.7038 10.4864 13.66C12.9333 14.6158 12.9333 14.2969 13.3747 14.2569C13.8156 14.2171 14.7982 13.6793 14.9996 13.122C15.1996 12.5638 15.1996 12.0858 15.1398 11.9862Z"
      fill="#161D3F"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.995 21.9999V21.999H22V14.664C22 11.0757 21.2275 8.31152 17.0325 8.31152C15.0158 8.31152 13.6625 9.41819 13.11 10.4674H13.0517V8.64652H9.07416V21.999H13.2158V15.3874C13.2158 13.6465 13.5458 11.9632 15.7017 11.9632C17.8258 11.9632 17.8575 13.9499 17.8575 15.499V21.9999H21.995Z"
      fill="#161D3F"
    />
    <path d="M2.32999 8.64746H6.47665V22H2.32999V8.64746Z" fill="#161D3F" />
    <path
      d="M4.40167 2C3.07583 2 2 3.07583 2 4.40167C2 5.7275 3.07583 6.82583 4.40167 6.82583C5.7275 6.82583 6.80333 5.7275 6.80333 4.40167C6.8025 3.07583 5.72667 2 4.40167 2V2Z"
      fill="#161D3F"
    />
  </svg>
);

export default ReferAndEarn;
