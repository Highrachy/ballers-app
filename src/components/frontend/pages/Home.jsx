import React from 'react';
import Header from 'components/layout/Header';
import { ReactComponent as PolkaDot } from 'assets/img/backgrounds/polka-dot.svg';
import HomeImage from 'assets/img/home.png';
import Income from 'assets/img/icons/income.png';
import Estates from 'assets/img/icons/estates.png';
import Credible from 'assets/img/icons/credible.png';
import Investment from 'assets/img/icons/investment.png';
import Fluid from 'assets/img/icons/fluid.png';
import PhoneImage from 'assets/img/phone.png';
import PrevArrow from 'assets/img/icons/btn-prev.png';
import NextArrow from 'assets/img/icons/btn-next.png';
import { Card, Accordion } from 'react-bootstrap';
import Slider from 'react-slick';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Footer from 'components/layout/Footer';

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

const BenefitsSection = () => {
  const BALLERS_BENEFITS = [
    {
      title: 'Recurring Income',
      body:
        'You can create several income generating streams from just becoming a member; referral income (the best in the industry), bonus points, interest on your contribution.',
      image: Income,
    },
    {
      title: 'Existing Estates',
      body:
        'We brought you the I-Factor and then Blissville, you can clearly see that our mantra is value driven quality real estate that enhances your overall living experience.',
      image: Estates,
    },
    {
      title: 'Credibility',
      body:
        'Powered by a team of seasoned professionals with extensive track record.',
      image: Credible,
    },
    {
      title: 'Investment Oriented',
      body:
        'For every contribution you make you get immediate bonus points that can easily be redeemed for a wide range of relaxing and sumptuous social activities.',
      image: Investment,
    },
    {
      title: 'Fluidity & Flexibility',
      body:
        'You can choose any amount to contribute once you have started and  you can pause or exit the scheme if so desired.',
      image: Fluid,
    },
  ];
  const CarouselArrow = ({ className, style, onClick, image }) => (
    <img
      src={image}
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block' }}
      alt="previous arrow"
    />
  );

  var settings = {
    speed: 1500,
    infinite: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    centerPadding: '0',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerMode: true,
          centerPadding: '1.5rem',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <CarouselArrow image={PrevArrow} />,
    nextArrow: <CarouselArrow image={NextArrow} />,
  };

  return (
    <section className="benefits bg-light-blue pb-5">
      <div className="text-center">
        <h6 className="header-secondary">BENEFITS</h6>
        <h3>Why Ballers is Special</h3>
      </div>
      <div className="container-fluid">
        <Slider {...settings}>
          {BALLERS_BENEFITS.map((benefit, index) => (
            <Card key={index}>
              <Card.Img
                variant="top"
                src={benefit.image}
                className="img-fluid benefits-icon"
                alt={benefit.title}
              />
              <Card.Body>
                <h6 className="text-secondary mb-3">{benefit.title}</h6>
                <Card.Text>{benefit.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Slider>
      </div>
    </section>
  );
};

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

  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = React.useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <>
        <span className="accordion-icon">{isCurrentEventKey ? '-' : '+'}</span>
        <h5 onClick={decoratedOnClick}>{children} </h5>
      </>
    );
  };

  return (
    <section className="container-fluid">
      <h6 className="header-secondary">FAQs</h6>
      <h2>
        Your questions <br /> Answered
      </h2>
      <div className="row">
        <div className="col-lg-9 col-sm-10 col-12 offset-lg-3 offset-sm-2 mt-5 faqs-section">
          <Accordion defaultActiveKey={0}>
            {FAQs.map((faq, index) => (
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  <ContextAwareToggle eventKey={index}>
                    {faq.question}
                  </ContextAwareToggle>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>{faq.answer}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const CommunityGallery = () => (
  <section className="community-gallery mt-6">
    <h6 className="header-secondary mb-5">COMMUNITY GALLERY</h6>
    <h2 className="mb-7">
      Take a deep dive into <br /> what your home looks like
    </h2>
    <button className="btn btn-secondary">SIGN UP NOW</button>
  </section>
);

export default Home;
