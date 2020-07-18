import React from 'react';
import Header from 'components/layout/Header';
import CommunityGallery from 'components/common/CommunityGallery';
import Footer from 'components/layout/Footer';
import TitleSection from 'components/common/TitleSection';

import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { DisplayFormikState } from './form-helper';

const FormComponents = () => (
  <>
    <Header />
    <TitleSection name="Form Components" content="Playground for forms" />
    <Content />
    <CommunityGallery />
    <Footer />
  </>
);

const Content = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="offset-lg-2 col-lg-8 mt-7">
        <h4>Form Components</h4>
        <Forms />
      </div>
    </div>
  </div>
);

const Forms = () => (
  <Formik
    initialValues={{
      email: 'harunpopson@yahoo.com',
      password: '123456',
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        console.log('values', values);
        actions.setSubmitting(false);
      }, 400);
    }}
    render={({ isSubmitting, handleSubmit, ...props }) => (
      <Form>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            label="First Name"
            name="firstName"
            placeholder="First Name"
          />
          <Input
            formGroupClassName="col-md-6"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            tooltipText="$$$ Here is the Last Name"
            optional
          />
        </div>
        <Input
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          tooltipText={<p className="text-danger">Your Password :-)</p>}
        />
        <Button
          className="btn-danger"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Register
        </Button>
        <DisplayFormikState {...props} />
      </Form>
    )}
    // validationSchema={{}}
  />
);

export default FormComponents;
