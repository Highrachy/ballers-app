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
import { referralInviteSchema } from 'components/forms/schemas/userSchema';
import ReferralImage from 'assets/img/refer-n-earn.png';
import { BASE_API_URL, REFERRAL_STATUS } from 'utils/constants';
import { CopyToClipBoardIcon } from 'components/utils/Icons';
import { UserContext } from 'context/UserContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Sharer from 'components/utils/Sharer';
import { CheckIcon } from 'components/utils/Icons';
import { getError } from 'utils/helpers';
import { getTokenFromStore } from 'utils/localStorage';
import NoContent from 'components/utils/NoContent';
import LoadItems from 'components/utils/LoadingItems';
import { ReferIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';

const ReferAndEarn = () => {
  const [referrals, setReferrals] = React.useState(null);
  const { userState } = React.useContext(UserContext);

  const id = userState._id;
  console.log(`userState`, userState);

  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/referral/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
      params: {
        referrerId: id,
      },
    })
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          setReferrals(data.referrals);
        }
      })
      .catch((error) => {
        setReferrals([]);
      });
  }, [id]);
  const addNewReferral = (referral) => setReferrals([...referrals, referral]);
  return (
    <BackendPage>
      <div className="col-sm-10 mx-auto">
        <EmailReferral />
        <InviteFriendByEmailCard addNewReferral={addNewReferral} />
        {/* <InviteFriendsTable referrals={referrals || []} /> */}
        <PaginatedContent
          endpoint={API_ENDPOINT.getAllReferrals()}
          initialFilter={{ referrerId: id }}
          pageName="Referrals"
          DataComponent={InviteFriendsTable}
          PageIcon={<ReferIcon />}
          queryName="referral"
        />
      </div>
    </BackendPage>
  );
};

const EmailReferral = () => {
  const { userState } = React.useContext(UserContext);
  const referralCode = `${process.env.REACT_APP_HOST}/ref/${userState.referralCode}`;

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

            <ReferralCodeClipBoard referralCode={referralCode} />

            <Sharer shareUrl={referralCode} />
          </div>
        </section>
      </Card>
    </div>
  );
};

const InviteFriendByEmailForm = ({ addNewReferral }) => {
  const [toast, setToast] = useToast();
  return (
    <Formik
      initialValues={setInitialValues(referralInviteSchema)}
      onSubmit={(values, actions) => {
        if (!values.firstName) delete values.firstName;

        Axios.post(`${BASE_API_URL}/referral/invite`, values, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setToast({
                type: 'success',
                message: `Invite sent to ${values.firstName || values.email}.`,
              });
              addNewReferral({ ...values, status: 'Sent' });
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
      validationSchema={createSchema(referralInviteSchema)}
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
              name="firstName"
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

const InviteFriendByEmailCard = ({ addNewReferral }) => (
  <div className="container-fluid">
    <Card className="mt-4 card-container">
      <section className="row p-4">
        <InviteFriendByEmailForm addNewReferral={addNewReferral} />
      </section>
    </Card>
  </div>
);

const ReferralCodeClipBoard = ({ referralCode }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [copied]);

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
          readOnly
        />
        <div className="input-group-append">
          <CopyToClipboard text={referralCode} onCopy={() => setCopied(true)}>
            {copied ? (
              <span className="input-group-text btn-success text-white disabled">
                <CheckIcon />
              </span>
            ) : (
              <span className="input-group-text btn btn-light">
                <CopyToClipBoardIcon />
              </span>
            )}
          </CopyToClipboard>
        </div>
      </div>
      <div className="mt-2">
        {copied && (
          <div className="small text-success text-center">
            Your referral link has been successfully copied!
          </div>
        )}
      </div>
    </>
  );
};

const InviteFriendsTable = ({ results, offset }) => {
  const referrals = results;
  return (
    <div className="container-fluid mt-5">
      <h6>
        {referrals !== null
          ? `You have ${referrals.length} invited ${Humanize.pluralize(
              referrals.length,
              'friend'
            )} `
          : 'Invited friends'}
      </h6>

      <LoadItems
        Icon={<ReferIcon />}
        items={referrals}
        loadingText="Loading your Referrals"
        noContent={<NoContent isButton text="No Referrals found" />}
      >
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {referrals &&
                referrals.map((referral, index) => (
                  <tr key={referral.email}>
                    <td>{index + 1 + offset}</td>
                    <td>{referral.firstName || '-'}</td>
                    <td>
                      <strong>{referral.email}</strong>
                    </td>
                    <td
                      className={`text-right ${
                        REFERRAL_STATUS[referral.status].className
                      }`}
                    >
                      {REFERRAL_STATUS[referral.status].text}
                    </td>
                  </tr>
                ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </LoadItems>
    </div>
  );
};

export default ReferAndEarn;
