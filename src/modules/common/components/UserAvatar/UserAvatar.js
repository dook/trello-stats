import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const UserAvatar = ({
  img,
  name,
  isSmall
}) => {
  const initials = name && name.split(' ').map((item) => item.substring(0, 1)).join('');
  const imgClasses = cx('user-avatar__image', { 'user-avatar__image--small': isSmall });
  const initialsClasses = cx('user-avatar__initials', { 'user-avatar__initials--small': isSmall });

  return (
    img
      ? <img className={imgClasses} src={img} alt="" />
      : <span className={initialsClasses}>{initials}</span>
  );
};

UserAvatar.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  isSmall: PropTypes.bool
};

export default UserAvatar;
