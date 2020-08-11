import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, Tabs, Tab } from 'react-bootstrap';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';

const Profile = () => (
  <BackendPage>
    <div className="container-fluid">
      <Card className="card-container">
        <Tabs defaultActiveKey="0">
          <Tab eventKey="0" title="First Gallery">
            <div className="card-tab-content py-5">
              <SampleImages />
              <SampleImages />
            </div>
          </Tab>
          <Tab eventKey="1" title="Second Gallery">
            <div className="card-tab-content py-5">
              <SampleImages />
            </div>
          </Tab>
          <Tab eventKey="2" title="Third Gallery">
            <div className="card-tab-content py-5">
              <SampleImages />
              <SampleImages />
              <SampleImages />
            </div>
          </Tab>
        </Tabs>
      </Card>
    </div>
  </BackendPage>
);

const SampleImages = () => (
  <div className="row">
    <div className="col-6 col-md-4 col-lg-3">
      <img
        src={PropertyPlaceholderImage}
        alt="Property"
        className="img-fluid  property-img"
      />
    </div>
    <div className="col-6 col-md-4 col-lg-3">
      <img
        src={PropertyPlaceholderImage}
        alt="Property"
        className="img-fluid  property-img"
      />
    </div>
    <div className="col-6 col-md-4 col-lg-3">
      <img
        src={PropertyPlaceholderImage}
        alt="Property"
        className="img-fluid  property-img"
      />
    </div>
    <div className="col-6 col-md-4 col-lg-3">
      <img
        src={PropertyPlaceholderImage}
        alt="Property"
        className="img-fluid  property-img"
      />
    </div>
  </div>
);

export default Profile;
