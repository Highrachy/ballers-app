import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import CardTableSection from 'components/common/CardTableSection';
import { UserContext } from 'context/UserContext';
import { getFormattedAddress } from 'utils/helpers';
import { navigate } from '@reach/router';

const ReviewInfo = () => (
  <BackendPage>
    <div className="container-fluid">
      <ReviewInfoForm />
    </div>
  </BackendPage>
);

export const ReviewInfoForm = () => {
  const { userState } = React.useContext(UserContext);
  return (
    <>
      <CardTableSection name="Client Details">
        <tr>
          <td>
            <strong>Company Name</strong>
          </td>
          <td>{userState.vendor?.companyName}</td>
        </tr>
        <tr>
          <td>
            <strong>Email</strong>
          </td>
          <td>{userState.email}</td>
        </tr>
        <tr>
          <td>
            <strong>Phone</strong>
          </td>
          <td>{userState.phone}</td>
        </tr>

        <tr>
          <td>
            <strong>Company Address</strong>
          </td>
          <td>
            {userState.vendor?.companyAddress &&
              getFormattedAddress(userState.vendor.companyAddress)}
          </td>
        </tr>
      </CardTableSection>

      <button
        className="btn btn-secondary"
        onClick={() => navigate('/vendor/dashboard')}
      >
        Finish Verification
      </button>
    </>
  );
};

export default ReviewInfo;
