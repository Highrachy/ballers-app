import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import { ReferIcon } from 'components/utils/Icons';
import { RightArrowIcon, SearchIcon } from 'components/utils/Icons';
import SearchForProperty from 'components/common/SearchDashboardPropertyForm';
import ContributionGraph from 'components/common/ContributionGraph';
import {
  OwnedPropertyCard,
  RecommendedPropertyLists,
} from 'components/common/PropertyCard';
import useWindowSize from 'hooks/useWindowSize';
import { MOBILE_WIDTH, BASE_API_URL } from 'utils/constants';
import { UserContext } from 'context/UserContext';
import LoadItems from 'components/utils/LoadingItems';
import { MyPropertyIcon } from 'components/utils/Icons';
import NoContent from 'components/utils/NoContent';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, getItems } from 'utils/helpers';
import Toast, { useToast, InfoBox } from 'components/utils/Toast';

const Dashboard = () => {
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
      <Welcome />
      <ShowInfo />
      <Overview />
      <Others recommendedProperties={properties} />
    </BackendPage>
  );
};

const Welcome = () => {
  const { userState /* userDispatch */ } = React.useContext(UserContext);
  const WINDOW_SIZE = useWindowSize();
  const [showSearch, setShowSearch] = React.useState(
    WINDOW_SIZE.width > MOBILE_WIDTH
  );
  return (
    <section className="container-fluid">
      <div className="card bg-primary dashboard mb-3">
        <div className="row">
          <div className="col-sm-5">
            <h4>Hello, {userState.firstName} </h4>
            <p className="lead">Welcome to BALL!</p>
          </div>
          <div className="col-sm-7">
            <section className="property-search__dashboard">
              {showSearch ? (
                <SearchForProperty />
              ) : (
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => setShowSearch(true)}
                >
                  <SearchIcon /> Search Property
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowInfo = () => (
  <div className="container-fluid">
    <InfoBox>
      <Link
        className="btn btn-success btn-sm float-right"
        to="/user/property/offer-letter/1"
      >
        View Offer Letter
      </Link>
      <h6 className="w-100 font-weight-normal">
        Highrachy has sent you an offer letter for{' '}
        <strong>Blissville Estate </strong>
        <br />
        <small className="text-muted">
          Expires on Sept 15, 2020 (in 1 day)
        </small>
      </h6>
    </InfoBox>
  </div>
);

const Overview = () => (
  <div className="container-fluid ">
    <div className="row row-eq-height">
      <div className="col-sm-8 mb-3">
        <ContributionGraph />
      </div>
      <div className="col-sm-4 mb-3">
        <ReferAndEarn />
      </div>
    </div>
  </div>
);

const ReferAndEarn = () => (
  <section className="card d-block card-container h-100 text-center">
    <div className="icon-container">
      <ReferIcon width={48} height={48} />
    </div>
    <h5 className="mt-3">Refer and Earn</h5>
    <p className="">
      Refer your colleagues and friends to receive bonuses to grow your BALL net
      worth.
    </p>
    <Link to="/user/refer-and-earn" className="btn btn-sm btn-secondary">
      Refer and Earn
    </Link>
  </section>
);

const Others = ({ recommendedProperties }) => (
  <>
    <div className="container-fluid">
      <LinkHeader to="/user/portfolio" name="Overview" />
      <div className="row row-eq-height">
        <div className="col-sm-6">
          <OwnedPropertyCard />
        </div>
        <div className="col-sm-6">
          <EnjoyYourBallingExperience />
        </div>
      </div>

      <LinkHeader to="/user/just-for-you" name="Just for you" />
      <div className="row">
        <div className="col-sm-6">
          <LoadItems
            Icon={<MyPropertyIcon />}
            items={recommendedProperties}
            loadingText="Loading Property Recommendations"
            noContent={<NoContent isButton text="No Properties found" />}
          >
            {recommendedProperties && (
              <RecommendedPropertyLists
                properties={getItems(recommendedProperties, 2) || []}
              />
            )}
          </LoadItems>
        </div>
      </div>
    </div>
  </>
);

const LinkHeader = ({ name, to }) => (
  <>
    <div className="link-header">
      <span>{name}</span>
      <Link to={to}>
        View All &nbsp;
        <RightArrowIcon />
      </Link>
    </div>
  </>
);

const EnjoyYourBallingExperience = () => (
  <Card className="card-container d-block text-center h-100">
    <h5 className="mt-5">Enjoying your balling experience?</h5>
    <div className="mb-5">Expand your portfolio today</div>

    <Link to="/user/just-for-you" className="btn btn-sm btn-secondary">
      Add a new property +{' '}
    </Link>
  </Card>
);

export default Dashboard;
