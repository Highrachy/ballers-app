import React from 'react';
import Toast from 'components/utils/Toast';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { UserIcon } from 'components/utils/Icons';
import TopTitle from 'components/utils/TopTitle';
import Humanize from 'humanize-plus';
import Pagination from 'components/common/Pagination';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { MenuIcon } from 'components/utils/Icons';
import { CloseIcon } from 'components/utils/Icons';
import { useToast } from 'components/utils/Toast';
import { useGetQuery } from 'hooks/useQuery';

const AdminList = ({
  addNewUrl,
  DataComponent,
  FilterComponent,
  limit,
  PageIcon,
  pageName,
  pluralPageName,
  endpoint,
  queryName,
  ...props
}) => {
  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const Icon = PageIcon || <UserIcon />;

  const [filters, setFilters] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);

  const [toast, setToast] = useToast();
  const [query, results] = useGetQuery({
    axiosOptions: { params: { limit, page: currentPage, ...filters } },
    key: 'result',
    name: queryName || pageName.toLowerCase(),
    setToast,
    endpoint,
    refresh: true,
    childrenKey: queryName,
  });

  const pagination = query?.data?.pagination;

  return (
    <>
      <TopTitle buttonText={`New ${pageName}`} to={addNewUrl}>
        {pagination?.total} {Humanize.pluralize(pagination?.total, pageName)}
      </TopTitle>
      <Toast {...toast} showToastOnly />

      {FilterComponent && (
        <TopFilter
          FilterComponent={FilterComponent}
          filters={filters}
          setFilters={setFilters}
        />
      )}

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
          results={results || []}
          offset={pagination?.offset || 0}
          {...props}
        />
        <Pagination
          currentPage={pagination?.currentPage}
          lastPage={pagination?.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </LoadItems>
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
        <div className="col-sm-12 mt-3">
          <div>
            <p
              className="filter-text text-right font-weight-bold"
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
                  {' '}
                  <MenuIcon /> Set Filter
                </>
              )}
            </p>
          </div>

          <small className="small--2 mt-3 d-block">{currentFilters()}</small>
        </div>
      </div>

      <SlideDown className={''}>
        {openFilter && <FilterComponent setFilterTerms={setFilterTerms} />}
      </SlideDown>
    </section>
  );
};
export default AdminList;
