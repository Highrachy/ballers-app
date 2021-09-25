import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { API_ENDPOINT } from 'utils/URL';
import { useCurrentRole } from 'hooks/useUser';
import { VAS_TYPE } from 'utils/constants';
import { useGetQuery } from 'hooks/useQuery';
import { useToast } from 'components/utils/Toast';
import { ContentLoader } from 'components/utils/LoadingItems';
import { VasIcon } from 'components/utils/Icons';
import { ProcessVasForm } from '../user/ProcessVas';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';

const PersonalizedVas = () => {
  const [toast, setToast] = useToast();

  const userType = useCurrentRole().name;
  const isUser = useCurrentRole().isUser;
  const axiosOptionsForUserVas = {
    params: {
      limit: 0,
      type: isUser ? VAS_TYPE.USER : VAS_TYPE.VENDOR,
      sortBy: 'name',
      sortDirection: 'desc',
    },
  };
  const [vasQuery] = useGetQuery({
    axiosOptions: axiosOptionsForUserVas,
    key: 'vas',
    name: 'vas',
    setToast,
    endpoint: API_ENDPOINT.getAllVas(),
    refresh: true,
  });

  console.log(`vasQuery`, vasQuery);

  return (
    <BackendPage>
      <ContentLoader
        hasContent={!!vasQuery.data?.result}
        Icon={<VasIcon />}
        query={vasQuery}
        name="Value Added Services"
        toast={toast}
      >
        <section className="container-fluid">
          <Card className="card-container">
            <div className="row">
              <div className="col-sm-12 mt-2">
                <h5 className="header-smaller">
                  Personalized Value Added Services
                </h5>

                <ProcessVasForm
                  hideForm={() => {}}
                  setToast={setToast}
                  vasInfo={vasQuery?.data?.result || []}
                />
              </div>
            </div>
          </Card>
          <div className="my-5 text-right">
            <Link
              className="btn btn-wide btn-dark"
              to={`/${userType}/vas/requests`}
            >
              View All Your Requests
            </Link>
          </div>
        </section>
      </ContentLoader>
    </BackendPage>
  );
};

export default PersonalizedVas;
