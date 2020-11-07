import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import { getError } from 'utils/helpers';
import { MyPropertyIcon } from 'components/utils/Icons';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import SearchDashboardPropertyForm from 'components/common/SearchDashboardPropertyForm';
import * as queryString from 'query-string';
import { UserContext } from 'context/UserContext';
import { RecommendedPropertyLists } from 'components/common/PropertyCard';

const JustForYou = ({ location }) => {
  const [toast, setToast] = useToast();
  const [properties, setProperties] = React.useState(null);
  const { userState } = React.useContext(UserContext);

  // From search query
  const queryParams = queryString.parse(location.search);
  const { state, houseType } = queryParams;

  // if no state or housetype, use preferences

  React.useEffect(() => {
    const payload = {};
    if (state) {
      payload['state'] = state;
    }
    if (houseType) {
      payload['houseType'] = houseType;
    }

    Axios.post(`${BASE_API_URL}/property/search`, payload, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;

        if (status === 200) {
          setProperties(data.properties);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, houseType]);

  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <SearchForm defaultInputValue={{ state, houseType }} />

      <section className="mt-5">
        <Properties title="Favorites" properties={userState.favorites} />
      </section>

      <LoadItems
        Icon={<MyPropertyIcon />}
        items={properties}
        loadingText="Loading Property Recommendations"
        noContent={<NoContent isButton text="No Properties found" />}
      >
        <Properties title="Properties for You" properties={properties || []} />
      </LoadItems>
    </BackendPage>
  );
};

const SearchForm = ({ defaultInputValue }) => (
  <div className="text-center py-4 mb-3 border-bottom">
    <h4>Search for your preferred Property</h4>
    <div className="row">
      <div className="col-sm-8 mx-auto">
        <div className="property-search__dashboard just-for-you__search">
          <SearchDashboardPropertyForm
            defaultInputValue={defaultInputValue}
            useDashboardStyles={false}
          />
        </div>
      </div>
    </div>
  </div>
);

const Properties = ({ properties, title }) => {
  return properties && properties.length > 0 ? (
    <div className="container-fluid">
      <h5 className="mt-4">{title}</h5>
      <div className="row">
        <RecommendedPropertyLists
          propertyClassName="col-sm-6"
          properties={properties}
        />
      </div>
    </div>
  ) : null;
};

export default JustForYou;
