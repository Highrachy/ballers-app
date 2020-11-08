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
import { getError } from 'utils/helpers';
import TopTitle from 'components/utils/TopTitle';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { SuccessIcon, InfoIcon } from 'components/utils/Icons';

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
          message: getError(error),
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <TopTitle>All Users</TopTitle>
      <AllUsers users={users} />
    </BackendPage>
  );
};

const AllUsers = ({ users, toast }) => (
  <LoadItems
    Icon={<UsersIcon />}
    items={users}
    loadingText="Loading your Users"
    noContent={
      <NoContent Icon={<UsersIcon />} isButton text="No Users found" />
    }
  >
    <UsersRowList toast={toast} users={users || []} />
  </LoadItems>
);

const UsersRowList = ({ users }) => {
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
                <td>Avatar</td>
                <td>Name</td>
                <td>Phone</td>
                <td>Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UsersRow
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

UsersRowList.propTypes = {
  users: PropTypes.array.isRequired,
};

const UsersRow = ({
  activated,
  _id,
  email,
  number,
  firstName,
  lastName,
  phone,
  phone2,
  profileImage,
  role,
  setToast,
}) => {
  const userId = _id;
  const [userRole, setUserRole] = React.useState(role);
  const processRoleChange = () => {
    const action = userRole === 1 ? 'upgrade' : 'downgrade';

    Axios.put(
      `${BASE_API_URL}/user/editor/${action}`,
      { userId },
      {
        headers: { Authorization: getTokenFromStore() },
      }
    )
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setToast({
            message: data.message,
            type: 'success',
          });
          setUserRole(userRole === 1 ? 3 : 1);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  };
  return (
    <tr>
      <td>{number}</td>
      <td>
        <img
          alt={firstName}
          className="img-fluid avatar--medium--small"
          src={profileImage ? profileImage.url : ProfileAvatar}
          title={firstName}
        />
      </td>
      <td>
        {firstName} {lastName} <br />
        <small>{email}</small>
      </td>
      <td>
        {phone} <br />
        {phone2 || '-'}
      </td>
      <td>
        {activated ? (
          <span className="text-green">
            <SuccessIcon />{' '}
          </span>
        ) : (
          <span className="text-muted">
            <InfoIcon />
          </span>
        )}
      </td>
      <td>
        {userRole === 1 && (
          <button
            className="btn btn-sm btn-secondary"
            onClick={processRoleChange}
          >
            Upgrade to an Editor
          </button>
        )}
        {userRole === 3 && (
          <button
            className="btn btn-sm btn-danger"
            // to={`/admin/user/${_id}`}
            onClick={processRoleChange}
          >
            Downgrade to a User
          </button>
        )}
      </td>
    </tr>
  );
};

export default Users;
