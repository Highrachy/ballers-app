import React from 'react';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import Image from 'components/utils/Image';

const UserCard = ({ user }) => {
  const { firstName, lastName, email, profileImage } = user;
  const userName = `${firstName} ${lastName}`;
  return (
    <div className="user-card">
      <div className="user-avatar user-avatar-sm bg-purple">
        <Image
          alt={firstName}
          defaultImage={ProfileAvatar}
          className="img-fluid avatar--medium--small"
          src={profileImage}
          title={firstName}
        />
      </div>

      {email ? (
        <div className="user-info">
          <span className="user-name">
            {userName}
            <span className="dot dot-success d-md-none ml-1"></span>
          </span>
          <small className="user-email">{email}</small>
        </div>
      ) : (
        <div className="user-name">
          <span className="tb-lead">{userName}</span>
        </div>
      )}
    </div>
  );
};

export default UserCard;
