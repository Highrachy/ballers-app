import React from 'react';
import PropTypes from 'prop-types';
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
import { addVideoSchema } from 'components/forms/schemas/propertySchema';
import { getError, statusIsSuccessful } from 'utils/helpers';
import Input from 'components/forms/Input';
import { LinkSeparator } from 'components/common/Helpers';
import { useCurrentRole } from 'hooks/useUser';
import { PlayIcon } from 'components/utils/Icons';

export const VideosForm = ({
  hideForm,
  setToast,
  setProperty,
  property,
  video,
}) => {
  const [toast] = useToast();
  // const [image, setImage] = React.useState(null);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(addVideoSchema, {
        title: video?.title,
        url: video?.url,
      })}
      onSubmit={({ title, url }, actions) => {
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
        var match = url.match(regExp);
        const youtubeId = match?.[2];
        if (!(match && youtubeId?.length === 11)) {
          setToast({
            message: 'Youtube link seems invalid. Please check and try again',
          });
          actions.setSubmitting(false);
          return;
        }

        const payload = {
          title,
          url: `https://www.youtube.com/embed/${youtubeId}`,
          propertyId: property._id,
        };

        Axios({
          method: video?._id ? 'put' : 'post',
          url: `${BASE_API_URL}/property-video`,
          data: video?._id ? { ...payload, id: video?._id } : payload,
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status, data } = response;
            if (statusIsSuccessful(status)) {
              setToast({
                type: 'success',
                message: `Your videos has been successfully ${
                  video?._id ? 'updated' : 'added'
                }`,
              });
              hideForm();

              let videos = [];

              if (video?._id) {
                videos = property.videos.filter(
                  (item) => item._id !== video._id
                );
              }

              setProperty({
                ...property,
                videos: [data.video, ...videos],
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
      validationSchema={createSchema(addVideoSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} showToastOnly />
          <section className="row">
            <div className="col-md-10 px-4">
              <h5>Add Videos</h5>
              <Input label="Title" name="title" placeholder="Title" />
              <Input
                label="Youtube URL"
                name="url"
                placeholder="Paste your youtube video url here"
                type="url"
              />
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                {video?._id ? 'Update' : 'Add'} Video
              </Button>
              <DisplayFormikState {...props} showAll />
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export const AddVideos = ({ className, setToast, setProperty, property }) => {
  const [showAddVideosModal, setShowAddVideosModal] = React.useState(false);
  return (
    <>
      <span className={className} onClick={() => setShowAddVideosModal(true)}>
        Add Videos
      </span>

      <Modal
        title="Videos"
        show={showAddVideosModal}
        onHide={() => setShowAddVideosModal(false)}
        showFooter={false}
        size="lg"
      >
        <VideosForm
          hideForm={() => setShowAddVideosModal(false)}
          setToast={setToast}
          setProperty={setProperty}
          property={property}
        />
      </Modal>
    </>
  );
};

export const VideosList = ({ property, setProperty, setToast }) => {
  const [showEditVideosModal, setShowEditVideosModal] = React.useState(false);
  const [showDeleteVideosModal, setShowDeleteVideosModal] =
    React.useState(false);

  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const deleteVideo = () => {
    setLoading(true);
    Axios.delete(`${BASE_API_URL}/property-video/${video._id}`, {
      headers: { Authorization: getTokenFromStore() },
      data: { videoId: video._id },
    })
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Video has been successfully deleted`,
          });

          const videos = property.videos.filter(
            (item) => item._id !== video._id
          );
          setProperty({ ...property, videos });
          setShowDeleteVideosModal(false);
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
  const userIsVendor = useCurrentRole().isVendor;
  const noVideos = property?.videos?.length === 0;
  return (
    <>
      <div className="property__floor-plans">
        {(!noVideos || userIsVendor) && (
          <h5 className="header-smaller mb-3 mt-5">Videos</h5>
        )}
        {!noVideos && (
          <div className="row">
            {property?.videos?.map((video, index) => (
              <div key={index} className="col-md-4 mb-4">
                <VideoModal video={video} key={video._id} />
                <p className="my-3">
                  <small
                    className="text-link text-muted"
                    onClick={() => {
                      setVideo(video);
                      setShowEditVideosModal(true);
                    }}
                  >
                    Edit Video
                  </small>
                  <LinkSeparator />
                  <small
                    className="text-link  text-muted"
                    onClick={() => {
                      setVideo(video);
                      setShowDeleteVideosModal(true);
                    }}
                  >
                    Delete Video
                  </small>
                </p>
              </div>
            ))}
            {/* Edit Videos Modal */}
            <Modal
              title="Videos"
              show={showEditVideosModal}
              onHide={() => setShowEditVideosModal(false)}
              showFooter={false}
              size="lg"
            >
              <VideosForm
                hideForm={() => setShowEditVideosModal(false)}
                property={property}
                setProperty={setProperty}
                setToast={setToast}
                video={video}
              />
            </Modal>

            {/* Delete Videos Modal */}
            <Modal
              title="Verify Vendor"
              show={showDeleteVideosModal}
              onHide={() => setShowDeleteVideosModal(false)}
              showFooter={false}
            >
              <section className="row">
                <div className="col-md-12 my-3 text-center">
                  {video?.url && (
                    <VideoYoutubeImage title={video?.title} url={video?.url} />
                  )}
                  <p className="my-4 font-weight-bold">
                    Are you sure you want to delete this Video
                  </p>
                  <Button
                    loading={loading}
                    className="btn btn-secondary mb-5"
                    onClick={() => deleteVideo()}
                  >
                    Delete Video
                  </Button>
                </div>
              </section>
            </Modal>
          </div>
        )}
      </div>

      {userIsVendor && (
        <div className="row">
          <div className="col-12">
            <AddVideos
              className="btn btn-secondary btn-xs btn-wide"
              property={property}
              setToast={setToast}
              setProperty={setProperty}
            />
          </div>
        </div>
      )}
    </>
  );
};

const VideoYoutubeImage = ({ title, url }) => {
  // get last 11 characters of the url
  const videoId = url.substr(url.length - 11);
  console.log(`videoId`, videoId);
  return (
    <img
      alt={title}
      className="img-fluid"
      src={`https://i1.ytimg.com/vi/${videoId}/0.jpg`}
    />
  );
};

VideoYoutubeImage.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.any.isRequired,
};

const VideoYoutubeOverlay = ({ showVideoModal }) => (
  <div className="card-img-overlay" onClick={showVideoModal}>
    <div className="card-img-overlay__content">
      <span className="icon icon-video">
        <PlayIcon />
      </span>
    </div>
  </div>
);

const VideoModal = ({ video }) => {
  const [showVideoModal, setShowVideoModal] = React.useState(false);

  // const approvalText = (
  //   <small
  //     className={`badge badge-${approval[status].color} transparent-${approval[status].color}`}
  //   >
  //     {approval[status].text}
  //   </small>
  // );

  return (
    <section className="d-block">
      <div className="card card__with-icon position-relative">
        <VideoYoutubeImage title={video.title} url={video.url} />
        <VideoYoutubeOverlay
          title={video.title}
          url={video.url}
          showVideoModal={() => setShowVideoModal(true)}
        />

        {/* Play Video Frame */}
        <Modal
          title="Videos"
          show={showVideoModal}
          onHide={() => setShowVideoModal(false)}
          showFooter={false}
          size="lg"
        >
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              src={video.url}
              title={video.title}
            ></iframe>
          </div>
        </Modal>
      </div>
    </section>
  );
};
