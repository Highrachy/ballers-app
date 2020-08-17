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
import { VisitationIcon } from 'components/utils/Icons';

const ScheduledVisits = () => {
  const [toast, setToast] = useToast();
  const [scheduledVisits, setScheduledVisits] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/visitation/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setScheduledVisits(data.schedules);
        }
      })
      .catch(function (error) {
        setToast({
          message: error.response.data.message,
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <AllScheduledVisits scheduledVisits={scheduledVisits} toast={toast} />
    </BackendPage>
  );
};

const AllScheduledVisits = ({ scheduledVisits, toast }) => (
  <LoadItems
    Icon={<VisitationIcon />}
    items={scheduledVisits}
    loadingText="Loading your ScheduledVisits"
    noContent={<NoContent isButton text="No ScheduledVisits found" />}
  >
    <ScheduledVisitsRowList
      toast={toast}
      scheduledVisits={scheduledVisits || []}
    />
  </LoadItems>
);

const ScheduledVisitsRowList = ({ scheduledVisits, toast }) => (
  <div className="container-fluid">
    <Toast {...toast} />
    <Card className="mt-4">
      <div className="table-responsive">
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <td>S/N</td>
              <td>DATE</td>
              <td>DESCRIPTION</td>
              <td>PHONE</td>
              <td>PROPERTY</td>
            </tr>
          </thead>
          <tbody>
            {scheduledVisits.map((scheduledVisit, index) => (
              <ScheduledVisitsRow
                key={index}
                number={index + 1}
                {...scheduledVisit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

ScheduledVisitsRowList.propTypes = {
  scheduledVisits: PropTypes.array.isRequired,
};

const ScheduledVisitsRow = ({
  number,
  visitorName,
  visitorEmail,
  visitorPhone,
  propertyInfo,
}) => (
  <tr>
    <td>{number}</td>
    <td>{visitorName}</td>

    <td>
      <strong>{visitorEmail}</strong>
    </td>
    <td>
      <strong>{visitorPhone}</strong>
    </td>
    <td>{propertyInfo[0].name}</td>
  </tr>
);

export default ScheduledVisits;
