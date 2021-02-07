import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { DASHBOARD_PAGE, USER_TYPES } from 'utils/constants';
import { SuccessIcon, InfoIcon } from 'components/utils/Icons';
import { Link } from '@reach/router';
import Humanize from 'humanize-plus';
import AdminList from 'components/common/AdminList';
import { Form, Formik } from 'formik';
import { setInitialValues } from 'components/forms/form-helper';
import { addAreaSchema } from 'components/forms/schemas/propertySchema';
// import { createSchema } from 'components/forms/schemas/schema-helpers';
import Select from 'components/forms/Select';
import { objectToOptions } from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import UserCard from 'components/common/UserCard';

const Users = () => (
  <AdminList
    url="user/all"
    pageName="User"
    DataComponent={UsersRowList}
    FilterComponent={AddAreaForm}
  />
);

const UsersRowList = ({ results, offset }) => {
  return (
    <div className="container-fluid">
      <Card>
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <td>S/N</td>
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
        <UserCard user={{ firstName, lastName, email, profileImage }} />
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

const AddAreaForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={setInitialValues(addAreaSchema)}
      onSubmit={(values, actions) => {
        setFilterTerms(
          { ...values },
          {
            role: `User Type : ${Humanize.titleCase(
              Object.keys(USER_TYPES)[values.role]
            )}`,
          }
        );
      }}
      // validationSchema={{}}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Card className="card-container">
            <section className="row">
              <div className="col-md-10 px-4">
                <h5 className="mb-4">Filter Users</h5>
                <div className="form-row">
                  <Select
                    formGroupClassName="col-md-6"
                    label="Role"
                    name="role"
                    options={objectToOptions(USER_TYPES)}
                    placeholder="Select Role"
                  />
                  <Input
                    formGroupClassName="col-md-6"
                    label="First Name"
                    name="firstName"
                  />
                </div>
              </div>
            </section>
          </Card>

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

export default Users;
