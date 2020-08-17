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
import { UsersIcon } from 'components/utils/Icons';

const Users = () => {
  const [toast, setToast] = useToast();
  const [users, setUsers] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/user/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setUsers(data.users);
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
      <AllUsers users={users} toast={toast} />
    </BackendPage>
  );
};

const AllUsers = ({ users, toast }) => (
  <LoadItems
    Icon={<UsersIcon />}
    items={users}
    loadingText="Loading your Users"
    noContent={<NoContent isButton text="No Users found" />}
  >
    <UsersRowList toast={toast} users={users || []} />
  </LoadItems>
);

const UsersRowList = ({ users, toast }) => (
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
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UsersRow key={index} number={index + 1} {...user} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

UsersRowList.propTypes = {
  users: PropTypes.array.isRequired,
};

const UsersRow = ({ number, firstName, lastName, email, phone }) => (
  <tr>
    <td>{number}</td>
    <td>
      {firstName} {lastName}
    </td>

    <td>
      <strong>{email}</strong>
    </td>
    <td>
      <strong>{phone}</strong>
    </td>
  </tr>
);

export default Users;
