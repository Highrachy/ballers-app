import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import queryString from 'query-string';
import ReactImageProcess from 'react-image-process';
import BallersLogo from 'assets/img/logo/ballers-logo.png';
import PlaceholderImage from 'assets/img/placeholder/image.png';

// https://github.com/lijinke666/react-image-process/blob/abf8db4b81a22cab2a12c2786718ce0029696401/example/example.js

const Image = ({
  src,
  defaultImage,
  name,
  className,
  bordered,
  responsiveImage,
  rounded,
  circle,
  options,
  watermark,
  serveImageFromCloud,
}) => {
  const IMAGE_SERVE_URL = '//images.weserv.nl';

  const query = {
    url: src,
    ...options,
  };

  const imgSrc = src
    ? `${IMAGE_SERVE_URL}?${queryString.stringify(query)}`
    : defaultImage;

  const classes = classNames(
    className,
    {
      'img-fluid': responsiveImage,
    },
    {
      'img-thumbnail': bordered,
    },
    {
      'img-rounded': rounded,
    },
    {
      'rounded-circle': circle,
    }
  );

  return watermark ? (
    <ReactImageProcess
      mode="waterMark"
      waterMarkType="image"
      waterMark={BallersLogo}
      width={60}
      height={40}
      opacity={0.3}
      coordinate={[30, 30]}
    >
      <img alt={name} className={classes} src={imgSrc} title={name} />
    </ReactImageProcess>
  ) : (
    <img
      alt={name}
      className={classes}
      src={serveImageFromCloud ? imgSrc : src}
      title={name}
    />
  );
};

Image.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  defaultImage: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.object,
  responsiveImage: PropTypes.bool,
  rounded: PropTypes.bool,
  serveImageFromCloud: PropTypes.bool,
  src: PropTypes.string.isRequired,
  watermark: PropTypes.bool,
};

Image.defaultProps = {
  bordered: false,
  className: '',
  defaultImage: PlaceholderImage,
  options: {},
  responsiveImage: true,
  rounded: false,
  serveImageFromCloud: true,
  watermark: false,
};

export default Image;
