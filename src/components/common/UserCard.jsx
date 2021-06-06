import React from 'react';
import ProfileAvatar from 'assets/img/placeholder/user.jpg';
import Image from 'components/utils/Image';
import { USER_TYPES } from 'utils/constants';

const UserCard = ({ user, hideImage, nameOnly }) => {
  const {
    title = '',
    firstName = '',
    lastName = '',
    email = '',
    role = '',
    profileImage,
    banned = { status: false },
    vendor = {},
  } = user;

  const isVendor = role === USER_TYPES.vendor;

  const userInitialName = `${title} ${firstName} ${lastName}`;
  const vendorName = vendor?.companyName || userInitialName;
  const userName = isVendor ? vendorName : userInitialName;

  const image = role === USER_TYPES.user ? profileImage : vendor?.companyLogo;

  return (
    <div className="user-card">
      {!hideImage && (
        <div className="user-avatar">
          <Image
            alt={firstName}
            defaultImage={ProfileAvatar}
            src={image}
            title={firstName}
            name={firstName}
            width="80"
          />
        </div>
      )}

      {!nameOnly ? (
        <div className="user-info">
          <span className={`user-name ${banned.status ? 'text-danger' : ''}`}>
            {userName}
          </span>
          <small className="user-email">{email}</small>
        </div>
      ) : (
        <div className="user-name">
          <span className={`tb-lead ${banned.status ? 'text-danger' : ''}`}>
            {userName}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserCard;
