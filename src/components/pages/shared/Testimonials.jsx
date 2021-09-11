import React from 'react';
import { Card } from 'react-bootstrap';
import PaginatedContent from 'components/common/PaginatedContent';
import { Form, Formik } from 'formik';
import {
  DisplayFormikState,
  processFilterValues,
  setInitialValues,
} from 'components/forms/form-helper';
import { formatFilterString } from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import BackendPage from 'components/layout/BackendPage';
import { TestimonialsIcon } from 'components/utils/Icons';
import { API_ENDPOINT } from 'utils/URL';
import { useCurrentRole } from 'hooks/useUser';
import { PropertyAvatar } from 'components/common/PropertyCard';
import ProfileAvatar from 'assets/img/placeholder/user.jpg';
import Modal from 'components/common/Modal';
import Textarea from 'components/forms/Textarea';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { BASE_API_URL } from 'utils/constants';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, statusIsSuccessful } from 'utils/helpers';
import { replyTestimonialSchema } from 'components/forms/schemas/propertySchema';
import { getTinyDate } from 'utils/date-helpers';
import { ReplyIcon } from 'components/utils/Icons';
import { UserContext } from 'context/UserContext';

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
  const { userState } = React.useContext(UserContext);
  return (
    <div className="container-fluid">
      <Card>
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Property</th>
                <th>Testimonial</th>
              </tr>
            </thead>
            <tbody>
              {results.map((testimonial, index) => (
                <TestimonialRow
                  key={index}
                  number={offset + index + 1}
                  testimonial={testimonial}
                  currentUser={userState}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const TestimonialRow = ({ currentUser, testimonial, number }) => {
  const { userInfo, propertyInfo, vendorInfo } = testimonial;
  const isUser = useCurrentRole().isUser;
  const isVendor = useCurrentRole().isVendor;

  return (
    <tr>
      <td>{number}</td>
      <td>
        <PropertyAvatar property={propertyInfo} />
      </td>
      <td>
        <SingleTestimonial
          testimonial={{
            ...testimonial,
            user: isUser ? currentUser : userInfo,
          }}
          vendor={isVendor ? currentUser : vendorInfo}
        />
      </td>
    </tr>
  );
};

export const TestimonialsList = ({ property, setProperty, setToast }) => {
  const noTestimonials = property?.testimonials?.length === 0;
  const [testimonial, setTestimonial] = React.useState(null);
  const [showReplyModal, setShowReplyModal] = React.useState(false);

  const handleTestimonial = (testimonial) => {
    setTestimonial(testimonial);
    setShowReplyModal(true);
  };

  return (
    <>
      <div className="property__testimonial">
        {!noTestimonials && (
          <h5 className="header-smaller mb-3 mt-5">Testimonials</h5>
        )}

        <section className="container-fluid testimonials">
          <div className="row">
            {!noTestimonials && (
              <>
                {property?.testimonials?.map((testimonial, index) => (
                  <>
                    <SingleTestimonial
                      testimonial={testimonial}
                      vendor={property?.vendorInfo?.vendor}
                      key={index}
                      handleTestimonial={() => handleTestimonial(testimonial)}
                    />
                  </>
                ))}
              </>
            )}
          </div>
        </section>
      </div>
      <Modal
        title="Reply To Testimonial"
        show={showReplyModal}
        onHide={() => setShowReplyModal(false)}
        showFooter={false}
      >
        <ReplyTestimonialForm
          testimonial={testimonial}
          setToast={setToast}
          setShowReplyModal={setShowReplyModal}
          setProperty={setProperty}
        />
      </Modal>
    </>
  );
};

export const SingleTestimonial = ({
  testimonial,
  vendor,
  handleTestimonial,
}) => {
  const isVendor = useCurrentRole().isVendor;
  return (
    <section className="w-100 mb-4">
      <aside className="conversation-list">
        <li className="clearfix">
          <div className="chat-avatar">
            <img
              src={testimonial?.user?.profileImage || ProfileAvatar}
              alt="user"
              className="rounded"
            />
          </div>
          <div className="conversation-text">
            <div className="ctext-wrap">
              <i>
                {testimonial?.user.firstName}{' '}
                {testimonial?.user.lastName?.charAt(0)?.toUpperCase()}
              </i>
              <p>{testimonial.testimonial}</p>
              <div className="text-right text-smaller text-muted">
                - {getTinyDate(testimonial?.createdAt)}
              </div>
              {isVendor && !testimonial?.response && handleTestimonial && (
                <div>
                  <Button
                    color="none"
                    className="btn btn-outline-secondary btn-xs"
                    onClick={handleTestimonial}
                  >
                    <ReplyIcon /> Reply Testimonial
                  </Button>
                </div>
              )}
            </div>
          </div>
        </li>

        {testimonial?.response && (
          <li className="clearfix odd">
            <div className="chat-avatar">
              <img
                src={
                  vendor?.companyLogo ||
                  '//images.weserv.nl?h=200&url=https%3A%2F%2Fballers-staging.s3.amazonaws.com%2F6118edc1f6a5aa00186006b6%2Fc984f060-fdb6-11eb-a7ac-65f0ba24a49a.png'
                }
                alt="vendor"
              />
            </div>
            <div className="conversation-text">
              <div className="ctext-wrap">
                <i>{vendor?.companyName || 'Blissville'}</i>
                <p>{testimonial?.response}</p>
                <div className="text-right text-smaller text-muted">
                  - {getTinyDate(testimonial.createdAt)}
                </div>
              </div>
            </div>
          </li>
        )}
      </aside>
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

const ReplyTestimonialForm = ({ testimonial, setToast, setShowReplyModal }) => {
  const testimonialId = testimonial._id;
  if (!testimonialId) {
    return null;
  }
  return (
    <section className="row">
      <div className="col-md-12 my-3">
        <Formik
          initialValues={setInitialValues(replyTestimonialSchema)}
          onSubmit={({ response }, actions) => {
            const payload = {
              response,
              testimonialId,
            };
            Axios.put(
              `${BASE_API_URL}/property/testimonial/reply`,
              { ...payload },
              {
                headers: { Authorization: getTokenFromStore() },
              }
            )
              .then(function (response) {
                const { status } = response;
                if (statusIsSuccessful(status)) {
                  setToast({
                    type: 'success',
                    message: `Your response has been successfully submitted`,
                  });
                  actions.setSubmitting(false);
                  actions.resetForm();
                  setShowReplyModal(false);
                }
              })
              .catch(function (error) {
                setToast({
                  message: getError(error),
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema(replyTestimonialSchema)}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <SingleTestimonial testimonial={testimonial} />
              <Textarea
                name="response"
                label="Response"
                placeholder="Your response"
                rows="3"
              />

              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Reply Testimonial
              </Button>

              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Testimonials;
