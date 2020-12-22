import React from 'react';
import Toast, { useToast } from 'components/utils/Toast';
import StepperPage from 'components/layout/StepperPage';
import { CompanyInformationForm } from './CompanyInformation';
import { BankInformationForm } from './BankInformation';
import { SignatoriesForm } from './Signatories';
import { ReviewInfoForm } from './ReviewInfo';
import { CertificatesForm } from './Certificates';

const AccountSetup = ({ id }) => {
  const [initialStep, setInitialStep] = React.useState(id);

  const [toast, setToast] = useToast();

  const moveToStep = (no) => setInitialStep(no);

  const ALL_STEPS = [
    null,
    <CompanyInformationForm
      moveToNextStep={() => moveToStep(2)}
      setStepToast={setToast}
    />,
    <BankInformationForm
      moveToNextStep={() => moveToStep(3)}
      setStepToast={setToast}
    />,
    <SignatoriesForm
      moveToNextStep={() => moveToStep(4)}
      setStepToast={setToast}
    />,
    <CertificatesForm
      moveToNextStep={() => moveToStep(5)}
      setStepToast={setToast}
    />,
    <ReviewInfoForm />,
  ];

  return (
    <>
      <Toast {...toast} showToastOnly />
      <StepperPage
        allSteps={ALL_STEPS}
        doneStatus={[false, false, false, false]}
        initialStep={parseInt(initialStep, 10) || 1}
        pageSteps={ADD_ENTERTAINER_STEPS}
        title="Vendor Verification"
      />
    </>
  );
};

const ADD_ENTERTAINER_STEPS = {
  companyInformation: { title: 'Company Information' },
  bankInformation: { title: 'Bank Information' },
  signatories: { title: 'Directors and Signatories' },
  certificates: { title: 'Certificates' },
  review: { title: 'Review Information' },
};

export default AccountSetup;
