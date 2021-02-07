import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { DASHBOARD_PAGE } from 'utils/constants';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { SuccessIcon, InfoIcon } from 'components/utils/Icons';
import { Link } from '@reach/router';
import Humanize from 'humanize-plus';
import AdminList from 'components/common/AdminList';

const Users = () => (
  <AdminList
    url="user/all"
    pageName="User"
    DataComponent={UsersRowList}
    limit={2}
  />
);

const UsersRowList = ({ results, offset }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-4">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <td>S/N</td>
                <td>Avatar</td>
                <td>Name</td>
                <td>Phone</td>
                <td>Role</td>
                <td>Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {results.map((user, index) => (
                <UsersRow key={index} number={offset + index + 1} {...user} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

UsersRowList.propTypes = {
  results: PropTypes.array.isRequired,
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
}) => {
  // const userId = _id;
  // const [userRole, setUserRole] = React.useState(role);
  // const processRoleChange = () => {
  //   const action = userRole === 1 ? 'upgrade' : 'downgrade';

  //   Axios.put(
  //     `${BASE_API_URL}/user/editor/${action}`,
  //     { userId },
  //     {
  //       headers: { Authorization: getTokenFromStore() },
  //     }
  //   )
  //     .then(function (response) {
  //       const { status, data } = response;
  //       if (status === 200) {
  //         setToast({
  //           message: data.message,
  //           type: 'success',
  //         });
  //         setUserRole(userRole === 1 ? 3 : 1);
  //       }
  //     })
  //     .catch(function (error) {
  //       setToast({
  //         message: getError(error),
  //       });
  //     });
  // };
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
      {/* <td>
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
      </td> */}
      <td>
        <Link className="btn btn-sm btn-secondary" to={`/admin/user/${_id}`}>
          View {Humanize.capitalize(DASHBOARD_PAGE[role])}
        </Link>
      </td>
    </tr>
  );
};

export default Users;
