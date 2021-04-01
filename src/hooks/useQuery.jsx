import React from 'react';
import Axios, { CancelToken } from 'axios';
import { queryCache, useQuery } from 'react-query';
import { getError, statusIsSuccessful } from 'utils/helpers';
import { getTokenFromStore } from 'utils/localStorage';

export const refreshQuery = (name, reloadQuery = false) =>
  queryCache.invalidateQueries(name, {
    refetchActive: reloadQuery,
  });

export const getQueryCache = (name) => queryCache.getQueryData(name);
export const setQueryCache = (name, value) =>
  queryCache.setQueryData(name, value);

export const useGetQuery = ({
  name,
  endpoint,
  key,
  setToast,
  refresh,
  childrenKey,
  queryOptions = {},
  axiosOptions = {},
}) => {
  const [result, setResult] = React.useState(null);

  if (refresh) {
    refreshQuery(name);
  }
  const queryResult = useQuery(
    name,
    async () => {
      const source = CancelToken.source();

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const promise = Axios.get(endpoint, {
        cancelToken: source.token,
        headers: {
          Authorization: getTokenFromStore(),
        },
        ...axiosOptions,
      })
        .then((res) => {
          if (statusIsSuccessful(res.status)) {
            setResult(res.data[key]);
            return res.data;
          }
          setToast({
            message: 'Request was not successful. Please try again later',
          });
        })
        .catch((error) => {
          setToast({
            message: getError(error),
          });
          throw new Error(getError(error));
        });

      promise.cancel = () => {
        setToast({ message: 'Query was cancelled' });
        source.cancel('Query was cancelled');
      };
      return promise;
    },
    {
      retry: 0,
      refetchOnWindowFocused: true,
      staleTime: Infinity, // still in memory but considered outdated
      cacheTime: Infinity, // time it would be removed in memoery
      ...queryOptions,
    }
  );

  console.log(`queryOptions`, queryOptions);

  const output = result || queryResult?.data?.[key];

  console.log(`output`, output);

  if (childrenKey && output?.length > 0) {
    output.forEach((item) =>
      setQueryCache([name, item._id], { [childrenKey]: item })
    );
  }

  return [queryResult, output, setResult];
};
