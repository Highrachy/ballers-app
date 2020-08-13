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
import { BASE_API_URL } from 'utils/constants';
import { CopyToClipBoardIcon } from 'components/utils/Icons';
import { UserContext } from 'context/UserContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Sharer from 'components/utils/Sharer';

const ReferAndEarn = () => (
  <BackendPage>
    <div className="col-sm-10 mx-auto">
      <EmailReferral />
      <InviteFriendByEmailCard />
      <InviteFriendsTable />
    </div>
  </BackendPage>
);

const EmailReferral = () => {
  const { userState } = React.useContext(UserContext);
  const referralCode = `https://ballers.ng?ref=${userState.referralCode}`;

  return (
    <div className="container-fluid">
      <h5>Refer your friends and earn more</h5>
      <Card className="mt-4 card-container">
        <section className="row py-4">
          <div className="col-sm-5 my-5">
            <img src={ReferralImage} alt="Referral" className="img-fluid" />
          </div>
          <div className="col-sm-7">
            <p className="text-primary mb-4">
              Refer your friends and earn. We will also give your friends
              rewards because we value your friendship.
            </p>

            <ReferralCodeClipBoard />

            <Sharer shareUrl={referralCode} />
          </div>
        </section>
      </Card>
    </div>
  );
};

const InviteFriendByEmailForm = () => {
  const [toast, setToast] = useToast();
  return (
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
          <h5 className="mb-4">Invite Your Friends</h5>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-4"
              isValidMessage="Email address seems valid"
              name="email"
              placeholder="Email Address"
            />
            <Input
              formGroupClassName="col-md-4"
              name="name"
              optional
              placeholder="Name (Optional)"
            />
            <div className="col-md-4">
              <Button
                className="btn-secondary btn-sm btn-wide ml-md-2"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Invite Friend
              </Button>
            </div>
          </div>
          <DisplayFormikState {...props} hide showAll />
        </Form>
      )}
    </Formik>
  );
};

const InviteFriendByEmailCard = () => (
  <div className="container-fluid">
    <Card className="mt-4 card-container">
      <section className="row p-4">
        <InviteFriendByEmailForm />
      </section>
    </Card>
  </div>
);

const ReferralCodeClipBoard = () => {
  const { userState } = React.useContext(UserContext);
  const referralCode = `https://ballers.ng?ref=${userState.referralCode}`;
  const [copied, setCopied] = React.useState(false);

  return (
    <>
      <label htmlFor="referralLink">Share Your Referral Link</label>
      <div className="input-group">
        <input
          type="text"
          name="referralLink"
          className="form-control"
          aria-label="referral code"
          value={referralCode}
        />
        <div className="input-group-append">
          <CopyToClipboard text={referralCode} onCopy={() => setCopied(true)}>
            <span className="input-group-text btn btn-light">
              <CopyToClipBoardIcon />
            </span>
          </CopyToClipboard>
        </div>
      </div>
      <div className="mt-2">
        {copied && (
          <div className="small text-danger text-center">
            Your referral link has been successfully copied
          </div>
        )}
      </div>
    </>
  );
};

const InviteFriendsTable = () => (
  <div className="container-fluid mt-5">
    <h6>Invited friends</h6>
    <div className="table-responsive">
      <table className="table">
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
  </div>
);

export default ReferAndEarn;
