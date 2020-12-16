import React from 'react';
import StepperPage from 'components/layout/StepperPage';
import { CompanyInformationForm } from './CompanyInformation';
import { BankInformationForm } from './BankInformation';
import { SignatoriesForm } from './Signatories';
import { ReviewInfoForm } from './ReviewInfo';

const AccountSetup = ({ id }) => {
  const ALL_STEPS = [
    null,
    <CompanyInformationForm />,
    <BankInformationForm />,
    <SignatoriesForm />,
    <ReviewInfoForm />,
  ];

  return (
    <StepperPage
      allSteps={ALL_STEPS}
      doneStatus={[false, false, false, false]}
      initialStep={parseInt(id, 10) || 1}
      pageSteps={ADD_ENTERTAINER_STEPS}
      title="Vendor Verification"
    />
  );
};

const ADD_ENTERTAINER_STEPS = {
  companyInformation: { title: 'Company Information' },
  bankInformation: { title: 'Bank Information' },
  signatories: { title: 'Directors and Signatories' },
  review: { title: 'Review Information' },
};

export default AccountSetup;
