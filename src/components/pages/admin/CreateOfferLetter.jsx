import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import Input from 'components/forms/Input';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import {
  createSchema,
  addressSchema,
} from 'components/forms/schemas/schema-helpers';
import { personalInfoSchema } from 'components/forms/schemas/userSchema';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import Select from 'components/forms/Select';
import Toast, { useToast } from 'components/utils/Toast';
import Textarea from 'components/forms/Textarea';
import { getError, generateNumOptions } from 'utils/helpers';

const CreateOfferLetter = () => (
  <BackendPage>
    <CreateOfferLetterForm />
  </BackendPage>
);

const CreateOfferLetterForm = () => {
  const [toast, setToast] = useToast();
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <div className="container-fluid">
      <Card className="mt-4">
        <section className="row">
          <div className="col-md-10 p-5">
            <h5>Create Offer Letter</h5>

            <Formik
              enableReinitialize={true}
              initialValues={{
                ...setInitialValues(personalInfoSchema, userState),
                address: setInitialValues(addressSchema, userState.address),
              }}
              onSubmit={(values, actions) => {
                const payload = { ...values };
                !payload.address.street2 && delete payload.address.street2;

                delete Axios.put(`${BASE_API_URL}/user/update`, values, {
                  headers: { Authorization: getTokenFromStore() },
                })
                  .then(function (response) {
                    const { status, data } = response;
                    if (status === 200) {
                      userDispatch({
                        type: 'user-profile-update',
                        user: data.updatedUser,
                      });
                      setToast({
                        type: 'success',
                        message: `Your profile has been successfully updated`,
                      });
                      actions.setSubmitting(false);
                    }
                  })
                  .catch(function (error) {
                    setToast({
                      message: getError(error),
                    });
                    actions.setSubmitting(false);
                  });
              }}
              validationSchema={createSchema({
                ...personalInfoSchema,
                address: createSchema(addressSchema),
              })}
            >
              {({ isSubmitting, handleSubmit, ...props }) => (
                <Form>
                  <Toast {...toast} />
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      label="Total Amount Payable"
                      name="totalAmountPayable"
                      placeholder="Total Amount Payable"
                    />
                    <Select
                      formGroupClassName="col-md-6"
                      label="Hand Over Date"
                      name="handOverDate"
                      placeholder="Select Hand Over Date"
                      options={generateNumOptions(61, 'Month', {
                        startFrom: 0,
                        firstMonthText: 'Immediately',
                      })}
                      tooltipText="Hand over date in months. For example, selecting 7 Months will display
                      Seven (7) Months from date of initial deposit payment. (i.e. 6
                        months payment period plus 1 month to finish and inspect)"
                    />
                  </div>
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      label="Allocation Price"
                      name="allocationPrice"
                      placeholder="Allocation Price"
                    />
                    <Select
                      formGroupClassName="col-md-6"
                      label="Allocation Month"
                      name="allocationMonth"
                      options={generateNumOptions(60, 'Month')}
                      placeholder="Allocation Month"
                    />
                  </div>
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      label="Initial Payment"
                      name="initialPayment"
                      placeholder="Initial Payment"
                    />
                    <Input
                      formGroupClassName="col-md-6"
                      label="Monthly Payment"
                      name="monthlyPayment"
                      placeholder="Monthly Payment"
                    />
                  </div>
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      label="Payment Frequency"
                      name="initialPayment"
                      placeholder="Initial Payment"
                    />
                    <Select
                      formGroupClassName="col-md-6"
                      label="Offer Expires in"
                      name="offerExpires"
                      options={generateNumOptions(11, 'Day', { startFrom: 5 })}
                      placeholder="Allocation Month"
                    />
                  </div>

                  <Textarea
                    label="Title Document"
                    name="description"
                    placeholder="A detailed description of the property"
                  />

                  <Textarea
                    label="Delivery State"
                    name="deliveryState"
                    placeholder="A detailed description of the property"
                  />

                  <Button
                    className="btn-secondary mt-4"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                  <DisplayFormikState {...props} hide showAll />
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </Card>
    </div>
  );
};
export default CreateOfferLetter;
