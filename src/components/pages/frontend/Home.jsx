import React from 'react';
import Header from 'components/layout/Header';
import { ReactComponent as PolkaDot } from 'assets/img/backgrounds/polka-dot.svg';
import HomeImage from 'assets/img/home.png';
import PhoneImage from 'assets/img/phone.png';
import Footer from 'components/layout/Footer';
import BenefitsSection from 'components/common/BenefitsSection';
import FAQsAccordion from 'components/common/FAQsAccordion';
import CommunityGallery from 'components/common/CommunityGallery';
import FAQsContent from 'content/faqs';

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
        <h6 className="header-secondary">ABOUT BALL</h6>
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
        <h6 className="header-secondary">HOW IT WORKS</h6>
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
  const FAQs = Object.values(FAQsContent).reduce((result, { faqs }, index) => {
    const homeFAQs = faqs.filter(({ showOnHomePage }) => showOnHomePage);
    return [...result, ...homeFAQs];
  }, []);
  return (
    <section className="container-fluid">
      <h6 className="header-secondary">FAQs</h6>
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
