import React from 'react';
import { Card } from 'react-bootstrap';
import PaginatedContent from 'components/common/PaginatedContent';
import BackendPage from 'components/layout/BackendPage';
import { BankAccountIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import { API_ENDPOINT } from 'utils/URL';
import { Spacing } from 'components/common/Helpers';
import Modal from 'components/common/Modal';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { addBankAccountSchema } from 'components/forms/schemas/bankAccountSchema';
import { getError, statusIsSuccessful } from 'utils/helpers';
import Input from 'components/forms/Input';
import { refreshQuery } from 'hooks/useQuery';

export const BankAccountForm = ({ hideForm, setToast, bankAccount }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(addBankAccountSchema, {
        accountName: 'Ballers',
        accountNumber: '0123456789',
        bankName: 'Skye',
      })}
      onSubmit={(payload, actions) => {
        Axios({
          method: bankAccount?._id ? 'put' : 'post',
          url: `${BASE_API_URL}/bank-account`,
          data: bankAccount?._id
            ? { ...payload, id: bankAccount?._id }
            : payload,
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (statusIsSuccessful(status)) {
              setToast({
                type: 'success',
                message: `Your Bank Account has been successfully ${
                  bankAccount?._id ? 'updated' : 'added'
                }`,
              });
              hideForm();
              refreshQuery('bank-account', true);
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
      validationSchema={createSchema(addBankAccountSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <section className="row">
            <div className="col-md-10 px-4">
              <h5>Add Bank Account</h5>
              <Input label="Account Name" name="accountName" />
              <Input label="Account Number" name="accountNumber" />
              <Input label="Bank Name" name="bankName" />
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                {bankAccount?._id ? 'Update' : 'Add'} Bank Account
              </Button>
              <DisplayFormikState {...props} showAll />
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

const BankAccount = () => {
  const [showAddBankModal, setShowAddBankModal] = React.useState(false);
  const [toast, setToast] = useToast();

  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <PaginatedContent
        addNewUrl={() => setShowAddBankModal(true)}
        endpoint={API_ENDPOINT.getAllBankAccounts()}
        pageName="Bank Account"
        DataComponent={BankAccountRowList}
        PageIcon={<BankAccountIcon />}
        queryName="bankAccount"
      />

      <Modal
        title="Bank Account"
        show={showAddBankModal}
        onHide={() => setShowAddBankModal(false)}
        showFooter={false}
      >
        <BankAccountForm
          hideForm={() => setShowAddBankModal(false)}
          setToast={setToast}
        />
      </Modal>
    </BackendPage>
  );
};

const BankAccountRowList = ({ results, offset, setToast }) => {
  const [showEditBankAccountModal, setShowEditBankAccountModal] =
    React.useState(false);
  const [showDeleteBankAccountModal, setShowDeleteBankAccountModal] =
    React.useState(false);

  const [bankAccount, setBankAccount] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const deleteBankAccount = () => {
    setLoading(true);
    Axios.delete(`${BASE_API_URL}/property-bankAccount/${bankAccount._id}`, {
      headers: { Authorization: getTokenFromStore() },
      data: { bankAccountId: bankAccount._id },
    })
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Bank Account has been successfully deleted`,
          });

          refreshQuery('bank-account', true);
          setShowDeleteBankAccountModal(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <Card className="mt-2">
          <div className="table-responsive">
            <table className="table table-border table-hover">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>Account Name</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {results.map((bankAccount, index) => (
                  <BankAccountRow
                    key={index}
                    number={offset + index + 1}
                    bankAccount={bankAccount}
                    setBankAccount={setBankAccount}
                    setShowEditBankAccountModal={setShowEditBankAccountModal}
                    setShowDeleteBankAccountModal={
                      setShowDeleteBankAccountModal
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {/* Edit Bank Account Modal */}
      <Modal
        title="BankAccount"
        show={showEditBankAccountModal}
        onHide={() => setShowEditBankAccountModal(false)}
        showFooter={false}
      >
        <BankAccountForm
          hideForm={() => setShowEditBankAccountModal(false)}
          setToast={setToast}
          bankAccount={bankAccount}
        />
      </Modal>

      {/* Delete Bank Account Modal */}
      <Modal
        title="Verify Vendor"
        show={showDeleteBankAccountModal}
        onHide={() => setShowDeleteBankAccountModal(false)}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-12 my-3 text-center">
            {bankAccount && (
              <>
                <p>{Humanize.titleCase(bankAccount?.bankName)}</p>
                <h4>{bankAccount?.accountNumber}</h4>
                <h5>{Humanize.titleCase(bankAccount?.accountName)}</h5>
              </>
            )}
            <p className="my-4 confirmation-text">
              Are you sure you want to delete this Bank Account?
            </p>
            <Button
              loading={loading}
              className="btn btn-secondary mb-5"
              onClick={() => deleteBankAccount()}
            >
              Delete Bank Account
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};

const BankAccountRow = ({
  bankAccount,
  number,
  setBankAccount,
  setShowEditBankAccountModal,
  setShowDeleteBankAccountModal,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{Humanize.titleCase(bankAccount.bankName)}</td>
      <td>{bankAccount.accountNumber}</td>
      <td>{Humanize.titleCase(bankAccount.accountName)}</td>
      <td>
        <p className="my-3">
          <small
            className="btn btn-xs btn-wide btn-secondary"
            onClick={() => {
              setBankAccount(bankAccount);
              setShowEditBankAccountModal(true);
            }}
          >
            Edit
          </small>
          <Spacing />
          <Spacing />
          <small
            className="btn btn-xs btn-wide btn-danger"
            onClick={() => {
              setBankAccount(bankAccount);
              setShowDeleteBankAccountModal(true);
            }}
          >
            Delete
          </small>
        </p>
      </td>
    </tr>
  );
};

export default BankAccount;
