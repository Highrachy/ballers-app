import React from 'react';
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
import { BASE_API_URL, NEIGHBORHOOD_STEPS, USER_TYPES } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import {
  neighborhoodSchema,
  neighborhoodTypeSchema,
} from 'components/forms/schemas/propertySchema';
import { getError, statusIsSuccessful, objectToOptions } from 'utils/helpers';
import Input from 'components/forms/Input';
import Image from 'components/utils/Image';
import { LinkSeparator } from 'components/common/Helpers';
import Select from 'components/forms/Select';
import { MapPinIcon } from 'components/utils/Icons';
import { Spacing } from 'components/common/Helpers';
import { SchoolIcon } from 'components/utils/Icons';
import { HospitalIcon } from 'components/utils/Icons';
import { PointOfInterestIcon } from 'components/utils/Icons';
import { FoodMenuIcon } from 'components/utils/Icons';
import { MallIcon } from 'components/utils/Icons';
import { EntertainmentIcon } from 'components/utils/Icons';
import { useCurrentRole } from 'hooks/useUser';

export const NeighborhoodForm = ({
  hideForm,
  setToast,
  setProperty,
  property,
  neighborhood,
}) => {
  const [toast] = useToast();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...setInitialValues(neighborhoodTypeSchema, {
          type: neighborhood?.type,
        }),
        neighborhood: setInitialValues(neighborhoodSchema, {
          ...neighborhood?.neighborhood,
        }),
      }}
      onSubmit={(payload, actions) => {
        Axios({
          method: neighborhood?._id ? 'put' : 'post',
          url: `${BASE_API_URL}/property/${property._id}/neighborhood`,
          data: neighborhood?._id
            ? { ...payload, typeId: neighborhood?._id }
            : payload,
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status, data } = response;
            if (statusIsSuccessful(status)) {
              setToast({
                type: 'success',
                message: `Your neighborhood has been successfully ${
                  neighborhood?._id ? 'updated' : 'added'
                }`,
              });
              hideForm();
              setProperty(data.property);
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
        ...neighborhoodTypeSchema,
        neighborhood: createSchema(neighborhoodSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} showToastOnly />

          <section className="row">
            <div className="col-md-10 px-4">
              <h5>Add Neighborhood</h5>
              <Select
                label="Type"
                name="type"
                options={objectToOptions(NEIGHBORHOOD_SELECT)}
                placeholder="Select Type"
              />
              <Input label="Name" name="neighborhood.name" placeholder="Name" />
              <Input
                label="Distance"
                name="neighborhood.distance"
                placeholder="Distance (in Km)"
              />

              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Add Neighborhood
              </Button>
              <DisplayFormikState {...props} showAll />
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export const AddNeighborhood = ({
  className,
  setToast,
  setProperty,
  property,
}) => {
  const [
    showAddNeighborhoodModal,
    setShowAddNeighborhoodModal,
  ] = React.useState(false);
  return (
    <>
      <span
        className={className}
        onClick={() => setShowAddNeighborhoodModal(true)}
      >
        Add Neighborhood
      </span>

      <Modal
        title="Neighborhood"
        show={showAddNeighborhoodModal}
        onHide={() => setShowAddNeighborhoodModal(false)}
        showFooter={false}
      >
        <NeighborhoodForm
          hideForm={() => setShowAddNeighborhoodModal(false)}
          setToast={setToast}
          setProperty={setProperty}
          property={property}
        />
      </Modal>
    </>
  );
};

export const NeighborhoodList = ({ property, setProperty, setToast }) => {
  const [
    showEditNeighborhoodModal,
    setShowEditNeighborhoodModal,
  ] = React.useState(false);
  const [
    showDeleteNeighborhoodModal,
    setShowDeleteNeighborhoodModal,
  ] = React.useState(false);

  const [neighborhood, setFloorPlan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log(`property`, property);

  const deleteFloorPlan = () => {
    setLoading(true);
    Axios.delete(`${BASE_API_URL}/property/${property._id}/neighborhood`, {
      headers: { Authorization: getTokenFromStore() },
      data: { neighborhoodId: neighborhood._id },
    })
      .then(function (response) {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Image has been successfully deleted`,
          });
          setProperty(data.property);
          setShowDeleteNeighborhoodModal(false);
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
  const userIsVendor = useCurrentRole().role === USER_TYPES.vendor;
  return (
    <>
      <div className="property__floor-plans mt-5">
        <h5 className="header-smaller mb-3">Neighborhood</h5>
        {NEIGHBORHOOD_STEPS.map(
          (step, index) =>
            property?.neighborhood?.[step]?.length > 0 && (
              <div key={index}>
                <IconBox
                  name={NEIGHBORHOOD_KEYS[step].name}
                  color={NEIGHBORHOOD_KEYS[step].color}
                  Icon={NEIGHBORHOOD_KEYS[step].icon}
                />

                <div className="row">
                  <div className="col-md-8">
                    <div className="list-neighbourhood">
                      <ul className="list-unstyled">
                        {property?.neighborhood?.[step].map(
                          ({ _id, distance, name }, index) => (
                            <li className="row mb-3" key={index}>
                              <p className="col-sm-8 mb-0">{name}</p>
                              <p className="col-sm-4 text-right mb-0">
                                <MapPinIcon /> <Spacing /> {distance} km
                              </p>
                              <br />
                              {userIsVendor && (
                                <small className="col-12">
                                  <span
                                    className="text-link text-muted"
                                    onClick={() => {
                                      setFloorPlan({ _id, name, distance });
                                      setShowEditNeighborhoodModal(true);
                                    }}
                                  >
                                    Edit
                                  </span>
                                  <LinkSeparator />
                                  <span
                                    className="text-link  text-muted"
                                    onClick={() => {
                                      setFloorPlan({ _id, name, distance });
                                      setShowDeleteNeighborhoodModal(true);
                                    }}
                                  >
                                    Delete
                                  </span>
                                </small>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}

        {/* Edit Neighborhood Modal */}
        <Modal
          title="Neighborhood"
          show={showEditNeighborhoodModal}
          onHide={() => setShowEditNeighborhoodModal(false)}
          showFooter={false}
        >
          <NeighborhoodForm
            hideForm={() => setShowEditNeighborhoodModal(false)}
            property={property}
            setProperty={setProperty}
            setToast={setToast}
            neighborhood={neighborhood}
          />
        </Modal>

        {/* Delete Neighborhood Modal */}
        <Modal
          title="Verify Vendor"
          show={showDeleteNeighborhoodModal}
          onHide={() => setShowDeleteNeighborhoodModal(false)}
          showFooter={false}
        >
          <section className="row">
            <div className="col-md-12 my-3 text-center">
              <Image
                src={neighborhood?.plan}
                name={neighborhood?.name || 'unknown'}
                options={{ h: 200 }}
                responsiveImage={true}
              />
              <p className="my-4 font-weight-bold">
                Are you sure you want to delete this Floor Plan
              </p>
              <Button
                loading={loading}
                className="btn btn-secondary mb-5"
                onClick={() => deleteFloorPlan()}
              >
                Delete Floor Plan
              </Button>
            </div>
          </section>
        </Modal>
      </div>

      {userIsVendor && (
        <div className="row">
          <div className="col-12">
            <AddNeighborhood
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

const IconBox = ({ name, color, Icon }) => (
  <div className="neighborhood-check icon-box">
    <span className={color}>{Icon}</span>
    {name}
  </div>
);

const NEIGHBORHOOD_KEYS = {
  entertainments: {
    name: 'Entertainment',
    icon: <EntertainmentIcon />,
    color: 'purple',
  },
  hospitals: {
    name: 'Health Care',
    icon: <HospitalIcon />,
    color: 'blue',
  },
  pointsOfInterest: {
    name: 'Points of Interest',
    icon: <PointOfInterestIcon />,
    color: 'gray',
  },
  restaurantsAndBars: {
    name: 'Restaurants and Bars',
    icon: <FoodMenuIcon />,
    color: 'orange',
  },
  schools: {
    name: 'Schools',
    icon: <SchoolIcon />,
    color: 'pink',
  },

  shoppingMalls: {
    name: 'Shopping Malls',
    icon: <MallIcon />,
    color: 'green',
  },
};

const NEIGHBORHOOD_SELECT = NEIGHBORHOOD_STEPS.reduce((acc, step) => {
  acc[NEIGHBORHOOD_KEYS[step].name] = step;
  return acc;
}, {});
