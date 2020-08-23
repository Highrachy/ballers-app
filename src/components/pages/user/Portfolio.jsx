import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Link } from '@reach/router';
import {
  OwnedPropertyCard,
  RecommendedPropertyCard,
} from 'components/common/PropertyCard';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
// import LoadItems from 'components/utils/LoadingItems';
// import NoContent from 'components/utils/NoContent';
// import { PropertiesIcon } from 'components/utils/Icons';
import { getError } from 'utils/helpers';
import LoadItems from 'components/utils/LoadingItems';
import { MyPropertyIcon } from 'components/utils/Icons';
import NoContent from 'components/utils/NoContent';

const Portfolio = () => {
  const [toast, setToast] = useToast();
  const [properties, setProperties] = React.useState(null);
  React.useEffect(() => {
    Axios.post(
      `${BASE_API_URL}/property/search`,
      {},
      {
        headers: {
          Authorization: getTokenFromStore(),
        },
      }
    )
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setProperties(data.properties);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <Others recommendedProperties={properties} />
    </BackendPage>
  );
};

const Others = ({ recommendedProperties }) => (
  <>
    <div className="container-fluid">
      <h5>Your active property</h5>
      <div className="row row-eq-height">
        <div className="col-sm-6">
          <OwnedPropertyCard />
        </div>
      </div>
    </div>

    <EnjoyingBallers />

    <LoadItems
      Icon={<MyPropertyIcon />}
      items={recommendedProperties}
      loadingText="Loading Property Recommendations"
      noContent={<NoContent isButton text="No Properties found" />}
    >
      <div className="container-fluid">
        <h5 className="mt-4">Just for you (Recommended Properties)</h5>
        <div className="row">
          {recommendedProperties &&
            recommendedProperties.map((property) => (
              <div className="col-sm-6" key={property._id}>
                <RecommendedPropertyCard {...property} />
              </div>
            ))}
        </div>
      </div>
    </LoadItems>
  </>
);

const EnjoyingBallers = () => (
  <section className="container-fluid">
    <div className="card bg-primary dashboard mt-4 mb-3">
      <div className="row py-4">
        <div className="col-sm-8">
          <h4>Enjoying your balling experience </h4>
          <p className="lead">Expand your portfolio today</p>
        </div>
        <div className="col-sm-4">
          <section className="property-btn">
            <Link to="/user/just-for-you" className="btn btn-secondary">
              + Add a New Property
            </Link>
          </section>
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;
