import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import Toast from 'components/utils/Toast';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { UsersIcon } from 'components/utils/Icons';
import TopTitle from 'components/utils/TopTitle';
import Humanize from 'humanize-plus';
import { usePagination } from 'hooks/usePagination';
import Pagination from 'components/common/Pagination';

const AdminList = ({
  DataComponent,
  limit,
  PageIcon,
  pageName,
  pluralPageName,
  url,
}) => {
  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const Icon = PageIcon || <UsersIcon />;

  const [currentPage, setCurrentPage] = React.useState(1);
  const [results, pagination, toast] = usePagination({
    url,
    page: currentPage,
    limit,
  });

  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <TopTitle>
        {pagination?.total} {Humanize.pluralize(pagination?.total, pageName)}
      </TopTitle>
      <LoadItems
        Icon={Icon}
        items={results}
        loadingText={`Loading  ${pluralizePageName}`}
        noContent={
          <NoContent
            Icon={Icon}
            isButton
            text={`No ${pluralizePageName} found.`}
          />
        }
      >
        <DataComponent
          toast={toast}
          results={results || []}
          offset={pagination?.offset || 0}
        />
        <Pagination
          currentPage={pagination?.currentPage}
          lastPage={pagination?.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </LoadItems>
    </BackendPage>
  );
};

export default AdminList;
