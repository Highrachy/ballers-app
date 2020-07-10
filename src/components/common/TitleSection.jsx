import React from 'react';
import PropTypes from 'prop-types';

const TitleSection = ({ name, content }) => (
  <section className="title-section">
    <h1>{name}</h1>
    <p className="px-8">{content}</p>
  </section>
);

TitleSection.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TitleSection;
