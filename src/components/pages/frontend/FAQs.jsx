import React from 'react';
import Header from 'components/layout/Header';
import CommunityGallery from 'components/common/CommunityGallery';
import Footer from 'components/layout/Footer';
import TitleSection from 'components/common/TitleSection';
import SearchIcon from 'assets/img/icons/search-icon.png';
import ProfileIcon from 'assets/img/icons/profile-icon.png';
import GettingStartedIcon from 'assets/img/icons/geting-started-icon.png';
import SecurityIcon from 'assets/img/icons/security-icon.png';
import PaymentIcon from 'assets/img/icons/payment-icon.png';
import Slider from 'react-slick';
import FAQsAccordion from 'components/common/FAQsAccordion';
import PhoneIcon from 'assets/img/icons/phone-icon.png';
import MailIcon from 'assets/img/icons/mail-icon.png';

const FAQs = () => (
  <>
    <Header />
    <TitleSection
      name="Frequently Asked Questions"
      content={
        <>
          Are you looking for an answer to your questions about BALL?
          <br />
          Here we have compiled an overview of frequently asked questions we
          receive from our BALLers
        </>
      }
    >
      <FAQSearch />
    </TitleSection>
    <FAQCategory />
    <AllFAQs />
    <MoreQuestions />
    <CommunityGallery />
    <Footer />
  </>
);

const FAQSearch = () => {
  return (
    <section className="col-lg-8 col-sm-10 col-11 mx-auto mt-4">
      <form className="faqs-search-form mx-auto">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <img src={SearchIcon} alt="search icon" className="img-fluid" />
            </span>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Search for a question..."
            aria-label="Search for a question..."
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">
              Search
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

const FAQCategory = () => {
  const CATEGORY = [
    {
      name: 'Profile',
      icon: ProfileIcon,
    },
    {
      name: 'Getting Started',
      icon: GettingStartedIcon,
    },
    {
      name: 'Payment',
      icon: PaymentIcon,
    },
    {
      name: 'Security',
      icon: SecurityIcon,
    },
  ];

  const settings = {
    speed: 500,
    infinite: true,
    centerMode: true,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    centerPadding: '0',
    slidesToShow: 4,
    dots: true,
    customPaging: function (i) {
      return '<span class="faq-slider-dot" id=' + i + '>&nbsp;</span>';
    },
    useTransform: true,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 992,
        dots: true,
        useTransform: true,
        cssEase: 'ease-in-out',
        settings: {
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        dots: true,
        settings: {
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="faq-category bg-light-blue py-5">
      <p className="text-center">
        or chooose a category to quickly find the help you need
      </p>
      <div className="container-fluid">
        <Slider {...settings} className="faq-category-slide">
          {CATEGORY.map((category, index) => (
            <div className="active" key={index}>
              <img
                src={category.icon}
                className="img-fluid"
                alt={`${category.name} icon`}
              />
              <h6>{category.name}</h6>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const AllFAQs = () => {
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
    <section className="container-fluid py-6">
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <h2 className="text-center">Getting Started</h2>
          <p className="lead text-center">
            This are questions on the general topic on about BALL.
            <br /> Please go through this section if you need your questions
            answered.
          </p>
          <div className="row">
            <div className="mt-5 col-12 faqs-section">
              <FAQsAccordion faqs={FAQs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MoreQuestions = () => (
  <section className="container-fluid">
    <h3 className="text-center mt-5">You still have a question?</h3>
    <p className="text-center lead mt-4">
      If you cannot find answer to your question in our FAQ, you can <br />{' '}
      always contact us . We will be with you shortly!
    </p>
    <div className="row mt-5">
      <aside className="col-lg-4 offset-lg-2 col-md-5 col-12 faq-contact-card">
        <img src={PhoneIcon} alt="Phone icon" />
        <h5 className="text-normal mt-4">+234 807 654 5543</h5>
        <p className="text-muted">We are always happy to help.</p>
      </aside>
      <aside className="col-lg-4 col-md-5 col-12 faq-contact-card">
        <img src={MailIcon} alt="Mail icon" />
        <h5 className="text-normal mt-4">
          <a
            className="text-primary"
            href="mailto:support@ballers.ng"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@ballers.ng
          </a>
        </h5>
        <p className="text-muted">The best way to get answer faster.</p>
      </aside>
    </div>
  </section>
);

export default FAQs;
