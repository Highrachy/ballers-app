import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';
import { OfferIcon } from 'components/utils/Icons';
import { Spacing } from 'components/common/Helpers';
import Button from 'components/forms/Button';
import { useBoolean } from 'hooks/useBoolean';
import Modal from 'components/common/Modal';
import { BUTTON_TYPES } from 'components/forms/Button';
import Humanize from 'humanize-plus';
import Axios from 'axios';
import { refreshQuery } from 'hooks/useQuery';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, statusIsSuccessful } from 'utils/helpers';

const OfferTemplates = () => (
  <BackendPage>
    <PaginatedContent
      endpoint={API_ENDPOINT.getAllOfferTemplates()}
      pageName="Offer Template"
      DataComponent={OffersRowList}
      PageIcon={<OfferIcon />}
      queryName="offerTemplates"
      childrenKey="offerTemplate"
    />
  </BackendPage>
);

export const OffersRowList = ({ results, offset, setToast }) => (
  <div className="container-fluid mb-5">
    <Card>
      <div className="table-responsive">
        <table className="table table-border table-hover mb-0">
          <tbody>
            {results?.map((offer, index) => (
              <OffersRow
                key={index}
                number={offset + index + 1}
                offerTemplate={offer}
                setToast={setToast}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const OffersRow = ({ number, offerTemplate, setToast }) => {
  const { status, _id, name } = offerTemplate;
  return (
    <>
      <tr>
        <td>{number}</td>
        <td>{name}</td>
        <td>{status}</td>

        <td>
          <ViewOfferTemplateButton offerTemplate={offerTemplate} />
          <Spacing />
          <Link
            className="btn btn-xs btn-dark btn-wide"
            to={`/vendor/offer-template/${_id}`}
          >
            Edit Template
          </Link>
          <Spacing />
          <DeleteOfferTemplateButton
            offerTemplate={offerTemplate}
            setToast={setToast}
          />
        </td>
      </tr>
    </>
  );
};

const ViewOfferTemplateButton = ({ offerTemplate }) => {
  const [showModal, setShowModalToTrue, setShowModalToFalse] =
    useBoolean(false);

  return (
    <>
      <Modal
        title="View Offer Template"
        show={showModal}
        onHide={setShowModalToFalse}
        showFooter={false}
      >
        <ViewOfferTemplate offerTemplate={offerTemplate} />
      </Modal>

      <Button
        color="info"
        type={BUTTON_TYPES.SMALL}
        onClick={setShowModalToTrue}
      >
        View Template
      </Button>
    </>
  );
};

const ViewOfferTemplate = ({ offerTemplate }) => <h1>{offerTemplate.name}</h1>;

const DeleteOfferTemplateButton = ({ offerTemplate, setToast }) => {
  const [showModal, setShowModalToTrue, setShowModalToFalse] =
    useBoolean(false);

  const [loading, setLoading] = React.useState(false);

  const deleteOfferTemplate = () => {
    setLoading(true);
    Axios.delete(`${BASE_API_URL}/offer/template/${offerTemplate._id}`, {
      headers: { Authorization: getTokenFromStore() },
    })
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Bank Account has been successfully deleted`,
          });

          refreshQuery('bank-account', true);
          setShowModalToFalse();
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
      <Modal
        title="Delete Offer Template"
        show={showModal}
        onHide={setShowModalToFalse}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-12 my-3 text-center">
            <p>{Humanize.titleCase(offerTemplate?.name)}</p>
            <h4>{offerTemplate?.status}</h4>
            <p className="my-4 confirmation-text">
              Are you sure you want to delete this Offer Template?
            </p>
            <Button
              color="danger"
              loading={loading}
              className="btn mb-5"
              onClick={() => deleteOfferTemplate()}
            >
              Delete Offer Template
            </Button>
          </div>
        </section>
      </Modal>

      <Button
        color="danger"
        type={BUTTON_TYPES.SMALL}
        onClick={setShowModalToTrue}
      >
        Delete Template
      </Button>
    </>
  );
};

export default OfferTemplates;
