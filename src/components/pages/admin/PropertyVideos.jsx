import React from 'react';
import { Card } from 'react-bootstrap';
import PaginatedContent from 'components/common/PaginatedContent';
import { Form, Formik } from 'formik';
import {
  DisplayFormikState,
  setInitialValues,
} from 'components/forms/form-helper';
import Select from 'components/forms/Select';
import { generateNumOptions, valuesToOptions } from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import BackendPage from 'components/layout/BackendPage';
import { PropertyVideosIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import { HOUSE_TYPES } from 'utils/constants';
import { API_ENDPOINT } from 'utils/URL';
import { VideoModal } from '../shared/Video';
import { BASE_API_URL } from 'utils/constants';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, statusIsSuccessful } from 'utils/helpers';
import Modal from 'components/common/Modal';
import { VideoYoutubeImage } from '../shared/Video';
import { SuccessIcon } from 'components/utils/Icons';
import { QuestionMarkIcon } from 'components/utils/Icons';

const PropertyVideos = () => {
  return (
    <BackendPage>
      <PaginatedContent
        endpoint={API_ENDPOINT.getAllPropertyVideos()}
        pageName="PropertyVideo"
        pluralPageName="PropertyVideos"
        DataComponent={PropertyVideosRowList}
        FilterComponent={FilterForm}
        PageIcon={<PropertyVideosIcon />}
        queryName="PropertyVideo"
      />
    </BackendPage>
  );
};

const ModalToShowTermsForAdmin = ({
  video,
  showApprovalModal,
  setShowApprovalModal,
  setToast,
}) => {
  const [loading, setLoading] = React.useState(false);
  const approveVideo = () => {
    setLoading(true);
    Axios.put(
      `${BASE_API_URL}/property-video/${video._id}/approve`,
      {},
      {
        headers: { Authorization: getTokenFromStore() },
      }
    )
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `The Video has been successfully approved`,
          });
          setShowApprovalModal(false);
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
    <Modal
      title="Approve Video"
      show={showApprovalModal}
      onHide={() => setShowApprovalModal(false)}
      showFooter={false}
    >
      <section>
        {video?._id && <VideoYoutubeImage {...video} />}
        <p className="my-4 text-center confirmation-text">
          Are you sure you want to approve this video?
        </p>
        <Button
          loading={loading}
          className="btn-secondary mt-4"
          onClick={() => approveVideo()}
        >
          Approve Video
        </Button>
      </section>
    </Modal>
  );
};

const PropertyVideosRowList = ({ results, offset, setToast }) => {
  const [video, setVideo] = React.useState(null);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);

  const showVideoApprovalModal = (video) => {
    setVideo(video);
    setShowApprovalModal(true);
  };

  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th className="text-center">Video</th>
                <th>Title</th>
                <th>&nbsp;</th>
                <th width="20%">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {results.map((video, index) => (
                <PropertyVideosRow
                  key={index}
                  number={offset + index + 1}
                  video={video}
                  showVideoApprovalModal={showVideoApprovalModal}
                />
              ))}
            </tbody>
          </table>
        </div>

        <ModalToShowTermsForAdmin
          video={video}
          showApprovalModal={showApprovalModal}
          setShowApprovalModal={setShowApprovalModal}
          setToast={setToast}
        />
      </Card>
    </div>
  );
};

const PropertyVideosRow = ({ number, video, showVideoApprovalModal }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <VideoModal video={video} key={video._id} />
      </td>
      <td>
        <p className="text-normal">{Humanize.titleCase(video.title)}</p>
      </td>
      <td>
        {video.approved ? (
          <span className="text-success">
            <SuccessIcon /> Approved
          </span>
        ) : (
          <span className="text-danger">
            <QuestionMarkIcon /> Pending
          </span>
        )}
      </td>
      <td>
        {!video.approved && (
          <Button
            className="btn-secondary"
            onClick={() => showVideoApprovalModal(video)}
          >
            Approve Video
          </Button>
        )}
      </td>
    </tr>
  );
};

const FilterForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={setInitialValues({})}
      onSubmit={(values, actions) => {
        setFilterTerms(
          { ...values },
          {
            houseType: `House Type : ${Humanize.titleCase(values.houseType)}`,
          }
        );
      }}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Card className="card-container">
            <section className="row">
              <div className="col-md-10 px-4">
                <h5 className="mb-4">Filter PropertyVideos</h5>
                <div className="form-row">
                  <Input
                    formGroupClassName="col-md-6"
                    label="PropertyVideo Name"
                    name="name"
                  />
                  <Input
                    formGroupClassName="col-md-6"
                    label="Price"
                    name="price"
                  />
                </div>
                <div className="form-row">
                  <Select
                    formGroupClassName="col-md-6"
                    label="Toilets"
                    name="toilets"
                    options={generateNumOptions(9, 'Toilet')}
                    placeholder="Select Toilets"
                  />
                  <Select
                    formGroupClassName="col-md-6"
                    label="House Type"
                    name="houseType"
                    options={valuesToOptions(HOUSE_TYPES)}
                    placeholder="House Type"
                  />
                </div>
              </div>
            </section>
          </Card>
          <DisplayFormikState {...props} showAll />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Filter Users
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyVideos;
