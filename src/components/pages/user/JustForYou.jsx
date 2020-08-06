import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { RecommendedPropertyCard } from 'components/common/PropertyCard';

const Portfolio = () => (
  <BackendPage>
    <Others />
  </BackendPage>
);

const Others = () => (
  <div className="container-fluid">
    <h5 className="mt-4">Just for you (Recommended Properties)</h5>
    <div className="row">
      <div className="col-sm-6">
        <RecommendedPropertyCard />
      </div>
      <div className="col-sm-6">
        <RecommendedPropertyCard />
      </div>
    </div>
  </div>
);

export default Portfolio;
