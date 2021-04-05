import React from 'react';
import { UserIcon } from 'components/utils/Icons';
import TopTitle from 'components/utils/TopTitle';
import Humanize from 'humanize-plus';
import Pagination from 'components/common/Pagination';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { CloseIcon } from 'components/utils/Icons';
import { useToast } from 'components/utils/Toast';
import { usePaginationQuery } from 'hooks/useQuery';
import { ContentLoader } from 'components/utils/LoadingItems';
import { FilterIcon } from 'components/utils/Icons';

const AdminList = ({
  addNewUrl,
  DataComponent,
  initialFilter = {},
  FilterComponent,
  limit,
  PageIcon,
  pageName,
  pluralPageName,
  endpoint,
  queryName,
  ...props
}) => {
  const [filters, setFilters] = React.useState(initialFilter);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [toast, setToast] = useToast();

  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const Icon = PageIcon || <UserIcon />;

  const [query, results] = usePaginationQuery({
    axiosOptions: { params: { limit, page: currentPage, ...filters } },
    key: 'result',
    name: queryName || pageName.toLowerCase(),
    setToast,
    endpoint,
    childrenKey: queryName,
  });

  const pagination = query?.latestData?.pagination;

  return (
    <>
      <TopTitle buttonText={`New ${pageName}`} to={addNewUrl}>
        {pagination?.total}{' '}
        {Humanize.pluralize(pagination?.total, pageName, pluralizePageName)}
      </TopTitle>

      <ContentLoader
        hasContent={results?.length > 0}
        Icon={Icon}
        query={query}
        name={pageName}
        toast={toast}
        noContentText={`No ${pluralizePageName} found`}
      >
        {FilterComponent && (
          <TopFilter
            FilterComponent={FilterComponent}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <DataComponent
          results={results || []}
          offset={pagination?.offset || 0}
          {...props}
        />

        <Pagination
          currentPage={pagination?.currentPage}
          lastPage={pagination?.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentLoader>
    </>
  );
};

const TopFilter = ({ FilterComponent, filters, setFilters }) => {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterInWords, setFilterInWords] = React.useState({});

  const setFilterTerms = (terms, filterInWords) => {
    setFilters(terms);
    setFilterInWords(filterInWords);
    setOpenFilter(false);
  };

  const removeFilterTerm = (property) => {
    setFilters({ ...filters, [property]: null });
    setFilterInWords({ ...filterInWords, [property]: null });
    setOpenFilter(false);
  };

  const currentFilters = () => {
    if (Object.keys(filters).length === 0) return null;
    let output = [];
    for (let item in filters) {
      if (
        filters?.[item] &&
        Object.prototype.hasOwnProperty.call(filters, item) &&
        filters[item] !== JSON.stringify('')
      ) {
        output.push(
          <button className="btn badge badge-filters" key={item}>
            {filterInWords?.[item] || filters[item]}{' '}
            <span
              className="icon icon-cancel"
              onClick={() => removeFilterTerm(item)}
            >
              <CloseIcon />
            </span>
          </button>
        );
      }
    }
    return output;
  };

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-2">
          <div
            className="filter-text text-right text-small font-weight-bold"
            onClick={() => {
              setOpenFilter((openFilter) => !openFilter);
            }}
          >
            {openFilter ? (
              <>
                <CloseIcon /> Close Filter
              </>
            ) : (
              <>
                <FilterIcon /> Filter Result
              </>
            )}
          </div>

          <small className="small--2 mt-2 d-block">{currentFilters()}</small>
        </div>
      </div>

      <SlideDown className={''}>
        {openFilter && <FilterComponent setFilterTerms={setFilterTerms} />}
      </SlideDown>
    </section>
  );
};
export default AdminList;
