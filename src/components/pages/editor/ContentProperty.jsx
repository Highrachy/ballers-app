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
import { getError } from 'utils/helpers';
import TopTitle from 'components/utils/TopTitle';

const ContentProperty = () => {
  const [toast, setToast] = useToast();
  const [contentProperty, setContentProperty] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/user/who-am-i`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setContentProperty(data);
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
      <AllContentProperty contentProperty={contentProperty} />
    </BackendPage>
  );
};

const sampleProperties = [
  {
    name: 'Property 1',
    area: 'Lekki Phase 1',
    houseType: '3 Bedroom Flat',
  },
  {
    name: 'Property 2',
    area: 'Ajegunle',
    houseType: '2 Bedroom Flat',
  },
  {
    name: 'Property in Lekki',
    area: 'Lekki Phase 1',
    houseType: '1 Bedroom Flat',
  },
  {
    name: 'Ajegunle Property',
    area: 'Ajegunle',
    houseType: 'Duplex',
  },
];

const AllContentProperty = ({ contentProperty, toast }) => (
  <LoadItems
    Icon={<MyPropertyIcon />}
    items={sampleProperties || contentProperty}
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
      contentProperty={sampleProperties || contentProperty || []}
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
                <td>S/N</td>
                <td>Name</td>
                <td>Area</td>
                <td>House Type</td>
                <td></td>
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
  number,
  name,
  houseType,
  setToast,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>{area}</td>
      <td>{houseType}</td>
      <td></td>
    </tr>
  );
};

export default ContentProperty;
