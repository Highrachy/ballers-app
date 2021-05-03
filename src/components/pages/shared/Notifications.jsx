import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';
import { NotificationIcon } from 'components/utils/Icons';
import { BASE_API_URL, NOTIFICATION_TYPE } from 'utils/constants';
import Timeago from 'timeago-react';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, statusIsSuccessful } from 'utils/helpers';
import BallersSpinner from 'components/utils/BallersSpinner';

const Notifications = () => (
  <BackendPage>
    <PaginatedContent
      endpoint={API_ENDPOINT.getAllNotifications()}
      pageName="Notification"
      pluralPageName="Notifications"
      DataComponent={NotificationsRowList}
      PageIcon={<NotificationIcon />}
      queryName="notification"
    />
  </BackendPage>
);

export const NotificationsRowList = ({ results, offset, setToast }) => {
  const [loading, setLoading] = React.useState(0);

  const markAsRead = (id) => {
    setLoading(id);
    Axios.put(
      `${BASE_API_URL}/notification/read/${id}/`,
      {},
      {
        headers: { Authorization: getTokenFromStore() },
      }
    )
      .then(function (response) {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          console.log(`data`, data);
          setLoading(0);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoading(0);
      });
  };

  const markAllAsRead = (id) => {
    setLoading(id);
    Axios.put(
      `${BASE_API_URL}/notification/read/all`,
      {},
      {
        headers: { Authorization: getTokenFromStore() },
      }
    )
      .then(function (response) {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: 'All notifications have been marked as read',
          });
          console.log(`data`, data);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoading(0);
      });
  };

  return (
    <div className="container-fluid mb-5">
      <p
        className="text-right text-link text-secondary text-small"
        onClick={markAllAsRead}
      >
        Mark All As Read
      </p>
      <Card>
        <div className="table-responsive">
          <table className="table table-border table-sm mb-0 notifications">
            <tbody>
              {results?.map((notification, index) => (
                <NotificationsRow
                  key={index}
                  number={offset + index + 1}
                  loading={notification._id === loading}
                  markAsRead={markAsRead}
                  {...notification}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const NotificationsRow = ({
  _id,
  description,
  type,
  read,
  createdAt,
  markAsRead,
  loading,
}) => (
  <tr className={read ? 'notification__read' : 'notification__unread'}>
    <td>
      <span
        className={`icon-circle icon-circle__${NOTIFICATION_TYPE[type]}`}
      ></span>{' '}
      &nbsp; &nbsp;
      {description}
    </td>
    <td>
      <small className="text-muted">
        <Timeago datetime={createdAt} />
      </small>
    </td>
    <td className="text-right">
      <small
        className="text-link text-secondary"
        onClick={() => markAsRead(_id)}
      >
        {loading ? <BallersSpinner small /> : !read && 'Mark as Read'}
      </small>
    </td>
  </tr>
);

export default Notifications;
