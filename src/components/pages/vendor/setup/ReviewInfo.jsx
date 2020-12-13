import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import CardTableSection from 'components/common/CardTableSection';

const ReviewInfo = () => (
  <BackendPage>
    <div className="container-fluid">
      <ReviewInfoForm />
    </div>
  </BackendPage>
);

export const ReviewInfoForm = () => {
  return (
    <CardTableSection name="Client Details">
      <tr>
        <td>
          <strong>Company Name</strong>
        </td>
        <td>Highrachy Investment and Technology</td>
      </tr>
      <tr>
        <td>
          <strong>Email</strong>
        </td>
        <td>Nnamdi@Highrachy.com</td>
      </tr>
      <tr>
        <td>
          <strong>Phone</strong>
        </td>
        <td>08123456789</td>
      </tr>

      <tr>
        <td>
          <strong>Company Address</strong>
        </td>
        <td>Lorem, ipsum dolor.</td>
      </tr>
    </CardTableSection>
  );
};

export default ReviewInfo;
