import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';

const FAQsAccordion = ({ faqs }) => {
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = React.useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <>
        <span className="accordion-icon">{isCurrentEventKey ? '-' : '+'}</span>
        <h5 onClick={decoratedOnClick}>{children} </h5>
      </>
    );
  };

  return (
    <Accordion defaultActiveKey={0}>
      {faqs.map((faq, index) => (
        <Card>
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
    </Accordion>
  );
};

FAQsAccordion.propTypes = {
  faqs: PropTypes.array.isRequired,
};

export default FAQsAccordion;
