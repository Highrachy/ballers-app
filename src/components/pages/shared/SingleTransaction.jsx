import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import Toast, { useToast } from 'components/utils/Toast';
import { MessageIcon } from 'components/utils/Icons';
import { useGetQuery } from 'hooks/useQuery';
import { API_ENDPOINT } from 'utils/URL';
import { ContentLoader } from 'components/utils/LoadingItems';
import { InvoiceContent } from '../frontend/Invoice';
import { generatePaymentInfo } from '../frontend/Invoice';

const pageOptions = {
  key: 'transaction',
  pageName: 'transaction',
};

const SingleTransaction = ({ id }) => {
  const [toast, setToast] = useToast();
  const [transactionQuery, transaction] = useGetQuery({
    key: pageOptions.key,
    name: [pageOptions.key, id],
    setToast,
    endpoint: API_ENDPOINT.getOneTransaction(id),
    refresh: true,
  });

  console.log(`transaction`, transaction);

  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <ContentLoader
        hasContent={!!transaction}
        Icon={<MessageIcon />}
        query={transactionQuery}
        name={pageOptions.pageName}
        toast={toast}
      >
        <InvoiceContent
          transaction={transaction}
          userInfo={transaction?.userInfo}
          paymentInfo={generatePaymentInfo({
            offer: {
              ...transaction?.offerInfo,
              propertyInfo: transaction?.propertyInfo,
            },
            vasRequest: {
              ...transaction?.vasRequestInfo,
              vasInfo: transaction?.vasInfo,
            },
            type: transaction?.model.type,
          })}
        />
      </ContentLoader>
    </BackendPage>
  );
};

export default SingleTransaction;
