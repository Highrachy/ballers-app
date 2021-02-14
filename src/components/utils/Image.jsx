import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import queryString from 'query-string';
import ReactImageProcess from 'react-image-process';
import BallersLogo from 'assets/img/logo/ballers-logo.png';

// https://github.com/lijinke666/react-image-process/blob/abf8db4b81a22cab2a12c2786718ce0029696401/example/example.js

const Image = ({
  src,
  name,
  className,
  bordered,
  responsiveImage,
  rounded,
  circle,
  options,
  watermark,
}) => {
  const IMAGE_SERVE_URL = '//images.weserv.nl';
  const query = {
    url: src,
    ...options,
  };

  const imgSrc = `${IMAGE_SERVE_URL}?${queryString.stringify(query)}`;
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
    <img alt={name} className={classes} src={imgSrc} title={name} />
  );
};

Image.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  responsiveImage: PropTypes.bool,
  rounded: PropTypes.bool,
  src: PropTypes.string.isRequired,
  options: PropTypes.object,
  watermark: PropTypes.bool,
};

Image.defaultProps = {
  bordered: false,
  className: '',
  responsiveImage: true,
  rounded: false,
  options: {},
  watermark: false,
};

export default Image;
