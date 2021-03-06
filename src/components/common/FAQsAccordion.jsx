import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { Fade } from 'react-awesome-reveal';

export const ContextAwareToggle = ({
  children,
  eventKey,
  callback,
  iconClose,
  iconOpen,
}) => {
  const currentEventKey = React.useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <>
      {isCurrentEventKey ? (
        <span className="accordion-icon accordion-icon-open">{iconOpen}</span>
      ) : (
        <span className="accordion-icon accordion-icon-close">{iconClose}</span>
      )}
      <h5 onClick={decoratedOnClick}>{children} </h5>
    </>
  );
};

ContextAwareToggle.propTypes = {
  children: PropTypes.any.isRequired,
  eventKey: PropTypes.any.isRequired,
  callback: PropTypes.func,
  iconClose: PropTypes.any,
  iconOpen: PropTypes.any,
};

ContextAwareToggle.defaultProps = {
  callback: () => {},
  iconClose: '+',
  iconOpen: '-',
};

const FAQsAccordion = ({ faqs }) => {
  return (
    <Accordion defaultActiveKey={0}>
      <Fade cascade damping={0.6} delay={1000}>
        {faqs.map((faq, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index}>
              <ContextAwareToggle eventKey={index}>
                {faq.question}
              </ContextAwareToggle>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>{faq.answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Fade>
    </Accordion>
  );
};

FAQsAccordion.propTypes = {
  faqs: PropTypes.array.isRequired,
};

export default FAQsAccordion;
