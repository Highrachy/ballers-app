import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
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
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { newPropertySchema } from 'components/forms/schemas/propertySchema';
import Textarea from 'components/forms/Textarea';
import InputFormat from 'components/forms/InputFormat';
import { getError } from 'utils/helpers';
import DatePicker from 'components/forms/DatePicker';

const NewTransaction = ({ id }) => (
  <BackendPage>
    <div className="container-fluid">
      <NewTransactionForm />
    </div>
  </BackendPage>
);

const NewTransactionForm = () => {
  const [toast, setToast] = useToast();
  const { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        ({
          ...setInitialValues(newPropertySchema),
          address: setInitialValues(addressSchema),
        },
        { address: { country: 'Nigeria' } })
      }
      onSubmit={(values, actions) => {
        const payload = { ...values };

        Axios.post(`${BASE_API_URL}/transaction/add`, payload, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status, data } = response;
            if (status === 201) {
              userDispatch({
                type: 'transaction-added',
                transaction: data.updatedUser,
              });
              setToast({
                type: 'success',
                message: `Your transaction has been successfully added`,
              });
              actions.setSubmitting(false);
              actions.resetForm();
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
        ...newPropertySchema,
        address: createSchema(addressSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <TransactionInfoForm {...props} />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Add New Transaction
          </Button>
          <DisplayFormikState {...props} showAll />
        </Form>
      )}
    </Formik>
  );
};

const TransactionInfoForm = () => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Transaction Information</h5>
          <div className="form-row">
            <InputFormat
              formGroupClassName="col-md-6"
              label="Amount"
              name="amount"
              placeholder="Transaction Amount"
            />

            <DatePicker
              label="Paid on"
              formGroupClassName="col-md-6"
              name="paidOn"
              placeholder="Paid On"
            />
          </div>

          <Textarea
            label="Additional Info"
            name="additionalInfo"
            placeholder="Additional Info"
          />
        </div>
      </section>
    </Card>
  );
};

export default NewTransaction;
