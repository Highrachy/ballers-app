import Axios from 'axios';
import TitleSection from 'components/common/TitleSection';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/TopBar';
import React from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL } from 'utils/constants';

const ReactQuery = () => {
  const queryInfo = useQuery('pokemon', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Axios.get(`${BASE_API_URL}/area/state/Lagos`).then(
      (res) => {
        console.log('res', res);
        if (res.status === 200) {
          return res.data.states;
        }
        throw new Error(res);
      },
      { retry: 1 }
    );
  });

  console.log('queryInfo', queryInfo);

  return (
    <>
      <Header />
      <TitleSection name="React Query" content="Testing React Query" />
      <div className="container-fluid">
        <h1>States</h1>
        {queryInfo.isLoading
          ? 'Loading'
          : queryInfo.isError
          ? queryInfo.error.message
          : queryInfo.data?.map((state) => <p key={state}>{state}</p>)}
      </div>
      <Footer />
    </>
  );
};

export default ReactQuery;
