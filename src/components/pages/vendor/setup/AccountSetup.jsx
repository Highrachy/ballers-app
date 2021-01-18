import React from 'react';
import Toast, { useToast } from 'components/utils/Toast';
import StepperPage from 'components/layout/StepperPage';
import { CompanyInformationForm } from './CompanyInformation';
import { BankInformationForm } from './BankInformation';
import { SignatoriesForm } from './Signatories';
import { ReviewInfoForm } from './ReviewInfo';
import { CertificatesForm } from './Certificates';
import { UserContext } from 'context/UserContext';
import { VENDOR_STEPS } from 'utils/constants';

export const getCompletedSteps = (userState) => [
  //logo and maybe entity type
  !!(userState.vendor?.companyLogo && userState.vendor?.entity),
  // any bank info
  !!userState.vendor?.bankInfo?.bankName,
  // One signatory info, check all with some
  !!(
    userState.vendor?.directors[0]?.isSignatory ||
    userState.vendor?.directors[1]?.isSignatory
  ),
  // tax certificate and one certificate
  !!(userState.vendor?.identification?.url && userState.vendor?.taxCertificate),
];

export const VerificationComments = ({ step }) => {
  const { userState } = React.useContext(UserContext);
  const currentStep = Object.keys(VENDOR_STEPS)[step - 1];
  const comments = userState.vendor?.verification[currentStep].comments || [];
  return comments.length > 0 ? (
    <section className="my-4">
      <h6>Past Comments</h6>
      {comments.map(({ comment }, index) => (
        <p key={index} className="speech-bubble">
          {comment}
        </p>
      ))}
    </section>
  ) : null;
};

export const getVerifiedSteps = (userState) => [
  userState.vendor?.verification?.companyInfo?.status,
  userState.vendor?.verification?.bankDetails?.status,
  userState.vendor?.verification?.directorInfo?.status,
  userState.vendor?.verification?.documentUpload?.status,
];

const AccountSetup = ({ id }) => {
  const [initialStep, setInitialStep] = React.useState(id);
  const { userState } = React.useContext(UserContext);

  React.useEffect(() => {
    setInitialStep(id);
  }, [id]);

  const [toast, setToast] = useToast();

  const moveToStep = (number) => setInitialStep(number);

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
        doneStatus={getCompletedSteps(userState)}
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
