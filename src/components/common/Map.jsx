import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const Map = ({ coordinates, zoom }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
      defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
      defaultZoom={zoom || 18}
    >
      <Marker lat={coordinates.lat} lng={coordinates.lng} />
    </GoogleMapReact>
  );
};

const Marker = () => (
  <>
    <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
      <div className="pin"></div>
    </OverlayTrigger>
    <div className="pulse"></div>
  </>
);

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
);

export default Map;
