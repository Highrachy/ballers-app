import React from 'react';
import PropTypes from 'prop-types';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { MyPropertyIcon } from 'components/utils/Icons';
import { getError, nearestMillion } from 'utils/helpers';
import TopTitle from 'components/utils/TopTitle';
import { Link } from '@reach/router';

const AllContentProperty = () => {
  const [toast, setToast] = useToast();
  const [contentProperty, setContentProperty] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/area/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setContentProperty(data.areas);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <TopTitle
        buttonText="New Content Property"
        to="/editor/content-property/new"
      >
        All Content Property
      </TopTitle>
      <ContentPRoperty contentProperty={contentProperty} />
    </BackendPage>
  );
};

const ContentPRoperty = ({ contentProperty, toast }) => (
  <LoadItems
    Icon={<MyPropertyIcon />}
    items={contentProperty}
    loadingText="Loading your Content Property"
    noContent={
      <NoContent
        Icon={<MyPropertyIcon />}
        isButton
        text="No Content Property found"
      />
    }
  >
    <ContentPropertyRowList
      toast={toast}
      contentProperty={contentProperty || []}
    />
  </LoadItems>
);

const ContentPropertyRowList = ({ contentProperty }) => {
  const [toast, setToast] = useToast();
  return (
    <div className="container-fluid">
      <Toast {...toast} showToastOnly />
      <Card className="mt-4">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Area</th>
                <th>State</th>
                <th className="text-center">Properties</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contentProperty.map((user, index) => (
                <ContentPropertyRow
                  key={index}
                  setToast={setToast}
                  number={index + 1}
                  {...user}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

ContentPropertyRowList.propTypes = {
  contentProperty: PropTypes.array.isRequired,
};

const ContentPropertyRow = ({
  _id,
  area,
  averagePrice,
  number,
  numOfProperties,
  state,
  minimumPrice,
  maximumPrice,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{area}</td>
      <td>{state}</td>
      <td className="text-center">{numOfProperties}</td>
      {/* <td className="text-center">
        {averagePrice > 0 ? (
          <>
            {nearestMillion(averagePrice)} <br />{' '}
            <small>
              {nearestMillion(minimumPrice)} - {nearestMillion(maximumPrice)}
            </small>
          </>
        ) : (
          '0'
        )}
      </td> */}
      <td>
        <Link
          className="btn btn-sm btn-secondary"
          to={`/editor/content-property/area/${_id}`}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default AllContentProperty;
