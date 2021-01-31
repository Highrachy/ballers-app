import React from 'react';

const UserCard = ({ showEmail }) => {
  return (
    <div className="user-card">
      <div className="user-avatar user-avatar-sm bg-purple">
        <span>AB</span>
      </div>

      {showEmail ? (
        <div className="user-name">
          <span className="tb-lead">Abu Bin Ishtiyak</span>
        </div>
      ) : (
        <div className="user-info">
          <span className="user-name">
            Abu Bin Ishtiyak{' '}
            <span className="dot dot-success d-md-none ml-1"></span>
          </span>
          <small className="user-email">info@softnio.com</small>
        </div>
      )}
    </div>
  );
};

export default UserCard;
