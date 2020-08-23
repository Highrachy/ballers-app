import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { RecommendedPropertyCard } from 'components/common/PropertyCard';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import { getError } from 'utils/helpers';
import { MyPropertyIcon } from 'components/utils/Icons';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import SearchDashboardPropertyForm from 'components/common/SearchDashboardPropertyForm';

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
      <SearchForm />
      <LoadItems
        Icon={<MyPropertyIcon />}
        items={properties}
        loadingText="Loading Property Recommendations"
        noContent={<NoContent isButton text="No Properties found" />}
      >
        <Properties recommendedProperties={properties || []} />
      </LoadItems>
    </BackendPage>
  );
};

const SearchForm = () => (
  <div className="text-center py-4 mb-3 border-bottom">
    <h4>Search for your preferred Property</h4>
    <div className="row">
      <div className="col-sm-8 mx-auto">
        <div className="property-search__dashboard just-for-you__search">
          <SearchDashboardPropertyForm useDashboardStyles={false} />
        </div>
      </div>
    </div>
  </div>
);

const Properties = ({ recommendedProperties }) => (
  <div className="container-fluid">
    <h5 className="mt-4">Properties for You</h5>
    <div className="row">
      {recommendedProperties &&
        recommendedProperties.map((property) => (
          <div className="col-sm-6" key={property._id}>
            <RecommendedPropertyCard {...property} />
          </div>
        ))}
    </div>
  </div>
);

export default Portfolio;
