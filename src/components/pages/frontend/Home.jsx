import React from 'react';
import Header from 'components/layout/Header';
import { ReactComponent as PolkaDot } from 'assets/img/backgrounds/polka-dot.svg';
import HomeImage from 'assets/img/home.png';
import PhoneImage from 'assets/img/phone.png';
import Footer from 'components/layout/Footer';
import BenefitsSection from 'components/common/BenefitsSection';
import FAQsAccordion from 'components/common/FAQsAccordion';
import CommunityGallery from 'components/common/CommunityGallery';

const Home = () => (
  <>
    <Header />
    <HoldingSection />
    <AboutSection />
    <BenefitsSection />
    <HowItWorksSection />
    <FAQsSection />
    <CommunityGallery />
    <Footer />
  </>
);

const HoldingSection = () => (
  <section>
    <div className="row mr-0 ml-0">
      <section className="col-md-6 pl-6">
        <h1 className="mt-6">
          Become <br /> a LandLord
        </h1>
        <p className="mt-4 text-muted">
          We make owning a home simpler and achievable.
        </p>
        <div className="dotted-polka">
          <PolkaDot width="100" />
        </div>
        {/* <section className="card mt-n8">
            <div className="input-group mb-3">
              <input
                className="form-control rounded mx-0"
                type="text"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                className="form-control rounded mx-0"
                type="text"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                className="form-control rounded mx-1"
                type="text"
                placeholder="Password"
                aria-label="Password"
              />
              <button className="btn btn-secondary" type="button">
                Register
              </button>
            </div>
          </section> */}

        <p className="holding-small">
          The only realistic burden free process of owning your ideal home.
        </p>
      </section>
      <section className="col-md-6 home-bg"></section>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="container-fluid bg-light-blue">
    <div className="row my-4">
      <div className="col-sm-6 col-12 text-center">
        <img src={HomeImage} className="img-fluid home-image" alt="home" />
      </div>
      <div className="col-sm-6 col-12 about">
        <h6 className="text-green">ABOUT BALL</h6>
        <h2>
          Game-changing service <br /> that makes owning <br /> your home easier
        </h2>
        <p className="my-5 text-normal">
          We make owning a home simpler and achievable. <br /> With BALL unique
          saving plan tailored to you and your <br /> financial position,owning
          a home has never been easier.
        </p>
        <button className="btn btn-secondary">LEARN MORE</button>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="container-fluid my-4">
    <div className="row">
      <div className="col-lg-4 mt-6">
        <img src={PhoneImage} alt="phone" className="img-fluid" />
      </div>
      <div className="col-lg-6 offset-lg-2">
        <h6 className="text-green">HOW IT WORKS</h6>
        <h3>BALLing is as easy as ABC</h3>

        <ul className="timeline mt-5">
          <li className="timeline__border">
            <h5 className="text-secondary font-weight-normal">
              <span className="font-weight-bold text-secondary h3">A</span>pply
              now
            </h5>
            <p className="pr-8 pb-4">
              Take control of your destiny and create a worthy legacy by filling
              our short registration form.
            </p>
          </li>
          <li className="timeline__border">
            <h5 className="text-secondary font-weight-normal">
              <span className="font-weight-bold text-secondary h3">B</span>egin
              periodic contribution
            </h5>
            <p className="pr-8 pb-4">
              Cultivate the habit of contribution today and reap the rewards
              forever with BALLers.
            </p>
          </li>
          <li>
            <h5 className="text-secondary font-weight-normal">
              <span className="font-weight-bold text-secondary h3">C</span>
              onvert to home ownership
            </h5>
            <p className="pr-8 pb-4">
              Convert structure to extended mortgage plan at affordable rates
              from 6% per annum.
            </p>
            <button className="btn btn-secondary">SIGN UP NOW</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

const FAQsSection = () => {
  const FAQs = [
    {
      question: 'What is BALL?',
      answer:
        'BALL is an acronym for Become A Landlord. It is an online platform that you can use to plan your income properly and define a clear step-by-step process that will take you from your current financial position to owning your dream home.',
    },
    {
      question: <>What is special about BALL?</>,
      answer:
        'BALL is the only platform that gives you the flexibility to make convenient contributions towards owning your home inline with your income. BALL also avails you with a myriad of benefits including additional income via our referral program, and access to vast real estate knowledge via our community.',
    },
    {
      question: 'Why should I subscribe to the BALL platform?',
      answer:
        'BALL is not for everyone, but if you are keen on owning your home in the shortest possible time with the least amount of stress then you should sign up.',
    },
    {
      question: <>What is the minimum amount to invest?</>,
      answer:
        'You can begin your subscription with as low as N50,000.00 with additional monthly payments of N10,000.00',
    },
    {
      question: <>How long does it take for me to own a home?</>,
      answer:
        '  The duration is based on several parameters including your disposable income, availability of savings that can be contributed at the beginning of the BALLing experience, type of home and Location of the property. However, if you have a substantial amount saved and can make significant monthly contributions, you can be handed the keys to your new home in less than 2 years.',
    },
  ];

  return (
    <section className="container-fluid">
      <h6 class="text-green">FAQs</h6>
      <h2>
        Your questions <br /> Answered
      </h2>
      <div className="row">
        <div className="col-lg-9 col-sm-10 col-12 offset-lg-3 offset-sm-2 mt-5 faqs-section">
          <FAQsAccordion faqs={FAQs} />
        </div>
      </div>
    </section>
  );
};

export default Home;
