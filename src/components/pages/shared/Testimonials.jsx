import React from 'react';
import { Card } from 'react-bootstrap';
import PaginatedContent from 'components/common/PaginatedContent';
import { Form, Formik } from 'formik';
import {
  DisplayFormikState,
  processFilterValues,
} from 'components/forms/form-helper';
import { formatFilterString } from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import BackendPage from 'components/layout/BackendPage';
import { TestimonialsIcon } from 'components/utils/Icons';
import { API_ENDPOINT } from 'utils/URL';
import { useCurrentRole } from 'hooks/useUser';
import { QuotesIcon } from 'components/utils/Icons';
// import { Link } from '@reach/router';
import UserCard from 'components/common/UserCard';
import { PropertyAvatar } from 'components/common/PropertyCard';
import ProfileAvatar from 'assets/img/placeholder/user.jpg';

const Testimonials = () => {
  return (
    <BackendPage>
      <PaginatedContent
        endpoint={API_ENDPOINT.getAllPropertyTestimonials()}
        pageName="Property Testimonial"
        pluralPageName="Testimonials"
        DataComponent={TestimonialsRowList}
        FilterComponent={FilterForm}
        PageIcon={<TestimonialsIcon />}
        queryName="PropertyTestimonial"
      />
    </BackendPage>
  );
};

const TestimonialsRowList = ({ results, offset }) => {
  const isUser = useCurrentRole().isUser;
  return (
    <div className="container-fluid">
      <Card>
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>{isUser ? 'Vendor' : 'User'}</th>
                <th>Testimonial</th>
                <th>Property</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((property, index) => (
                <TestimonialRow
                  key={index}
                  number={offset + index + 1}
                  {...property}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const TestimonialRow = ({
  testimonial,
  number,
  userInfo,
  propertyInfo,
  vendorInfo,
}) => {
  const isUser = useCurrentRole().isUser;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <UserCard user={isUser ? vendorInfo : userInfo} />
      </td>
      <td>{testimonial}</td>
      <td>
        <PropertyAvatar
          property={propertyInfo}
          // portfolioId={referral?.offerInfo?._id}
        />
      </td>
      <td></td>
    </tr>
  );
};

export const TestimonialsList = ({ property, setProperty, setToast }) => {
  const userIsVendor = useCurrentRole().isVendor;
  const noTestimonials = property?.testimonials?.length === 0;

  return (
    <>
      <div className="property__testimonial">
        {(!noTestimonials || userIsVendor) && (
          <h5 className="header-smaller mb-3 mt-5">Testimonials</h5>
        )}

        <section className="container-fluid testimonials">
          <div className="row">
            {!noTestimonials && (
              <>
                {property?.testimonials?.map((testimonial, index) => (
                  <>
                    <SingleTestimonial testimonial={testimonial} key={index} />
                  </>
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

const SingleTestimonial = ({ testimonial }) => {
  return (
    <section className="w-100 mb-4">
      <div className="testimonial-card">
        <p className="post">
          <span className="quote-img">
            <QuotesIcon />
          </span>
          <span className="post-txt">{testimonial.testimonial}</span>
        </p>
      </div>
      <div className="arrow-down" />
      <div className="row">
        <div className>
          <img
            alt="test"
            className="profile-pic fit-image"
            src={testimonial.user.profileImage || ProfileAvatar}
          />
        </div>
        <p className="profile-name">
          {testimonial.user.firstName} {testimonial.user.lastName}
        </p>
      </div>
    </section>
  );
};

const FilterForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        const payload = processFilterValues(values);
        setFilterTerms(payload, {
          title: formatFilterString('Title', values.title),
          status: formatFilterString('Status', values.status),
        });
      }}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Input label="Title" name="title" />
          <DisplayFormikState {...props} showAll />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Filter Property Testimonial
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Testimonials;
