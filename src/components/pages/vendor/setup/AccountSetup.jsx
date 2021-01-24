import React from 'react';
import Toast, { useToast } from 'components/utils/Toast';
import StepperPage from 'components/layout/StepperPage';
import { CompanyInformationForm } from './CompanyInformation';
import { BankInformationForm } from './BankInformation';
import { SignatoriesForm } from './Signatories';
import { ReviewInfoForm } from './ReviewInfo';
import { CertificatesForm } from './Certificates';
import { UserContext } from 'context/UserContext';
import { VENDOR_STEPS, VENDOR_VERIFICATION_STATUS } from 'utils/constants';

export const getCompletedSteps = (userState) => [
  //logo and maybe entity type
  !!(userState.vendor?.companyLogo && userState.vendor?.entity),
  // any bank info
  !!userState.vendor?.bankInfo?.bankName,
  // One signatory info, check all with some
  companyHasSignatory(userState.vendor?.directors || []),
  // tax certificate and one certificate
  !!(userState.vendor?.identification?.url && userState.vendor?.taxCertificate),
];

export const companyHasSignatory = (directors) =>
  directors.some(({ isSignatory }) => isSignatory);

export const VerificationComments = ({ step }) => {
  const { userState } = React.useContext(UserContext);
  const currentStep = Object.keys(VENDOR_STEPS)[step - 1];
  const comments = userState.vendor?.verification?.[currentStep].comments || [];
  const pendingComments = comments.filter(
    (comment) => comment.status === 'Pending'
  );

  return pendingComments.length > 0 ? (
    <section className="my-4">
      <h6>Pending Comments</h6>
      {pendingComments.map(({ comment }, index) => (
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

export const getVerifiedProgress = (userState) => {
  const verifiedSteps = getVerifiedSteps(userState);
  const numberOfVerifiedSteps = verifiedSteps.filter(
    (step) => step === 'Verified'
  );
  return (numberOfVerifiedSteps.length / verifiedSteps.length) * 100;
};

export const getVerificationState = (userState) => {
  // check if user has not started
  const completedSteps = getCompletedSteps(userState);

  const vendorHasStarted = completedSteps.some((startedStep) => startedStep);

  if (!vendorHasStarted) {
    return { status: VENDOR_VERIFICATION_STATUS.NOT_STARTED, page: 1 };
  }

  //pending comments
  let allPendingComments = 0;
  let firstCommentPage = 0;

  Object.keys(VENDOR_STEPS).map((step, index) => {
    const comments = userState.vendor?.verification?.[step].comments || [];
    const pendingComments = comments.filter(
      (comment) => comment.status === 'Pending'
    );
    if (firstCommentPage === 0 && pendingComments.length > 0) {
      firstCommentPage = index + 1;
    }
    allPendingComments += pendingComments.length;
    return step;
  });

  if (allPendingComments > 0) {
    return {
      status: VENDOR_VERIFICATION_STATUS.PENDING_COMMENTS,
      page: firstCommentPage,
      numberOfComments: allPendingComments,
    };
  }

  let currentOnboardingPage = 5;
  const verifiedSteps = getVerifiedSteps(userState);
  const vendorHasAllStepsVerified = verifiedSteps.every((status, index) => {
    currentOnboardingPage = index + 1;
    return status === 'Verified';
  });

  // Current In Review
  if (vendorHasAllStepsVerified) {
    return { status: VENDOR_VERIFICATION_STATUS.IN_REVIEW, page: 5 };
  }

  // Still Onboarding
  return {
    status: VENDOR_VERIFICATION_STATUS.STILL_ONBOARDING,
    page: currentOnboardingPage,
  };
};

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
