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
import { getError } from 'utils/helpers';
import { MessageIcon } from 'components/utils/Icons';

const Enquiries = () => {
  const [toast, setToast] = useToast();
  const [enquiries, setEnquiries] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/enquiry/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          console.log('data.enquiries', data.enquiries);
          setEnquiries(data.enquiries);
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
      <AllEnquiries enquiries={enquiries} toast={toast} />
    </BackendPage>
  );
};

const AllEnquiries = ({ enquiries }) => (
  <LoadItems
    Icon={<MessageIcon />}
    items={enquiries}
    loadingText="Loading your Enquiries"
    noContent={<NoContent isButton text="No Enquiries found" />}
  >
    <EnquiriesRowList enquiries={enquiries || []} />
  </LoadItems>
);

const EnquiriesRowList = ({ enquiries }) => (
  <div className="container-fluid">
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
            {enquiries.map((enquiry, index) => (
              <EnquiriesRow key={index} number={index + 1} {...enquiry} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

EnquiriesRowList.propTypes = {
  enquiries: PropTypes.array.isRequired,
};

const EnquiriesRow = ({
  number,
  title,
  firstName,
  lastName,
  email,
  phone,
  propertyInfo,
}) => (
  <tr>
    <td>{number}</td>
    <td>
      {title} {firstName} {lastName}
    </td>

    <td>
      <strong>{email}</strong>
    </td>
    <td>
      <strong>{phone}</strong>
    </td>
    <td>{propertyInfo[0] && propertyInfo[0].name}</td>
  </tr>
);

export default Enquiries;
