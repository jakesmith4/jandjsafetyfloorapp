import { useGlobalContext } from '../context';
import SingleJob from './SingleJob';

const SearchJobs = () => {
  const { searchJob, jobsFound, searchInputValue } = useGlobalContext();

  jobsFound?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="search-jobs current-owner">
      <h2 className="search-jobs-heading">search jobs</h2>
      <input
        type="text"
        id="search"
        className="form-input search-input"
        value={searchInputValue}
        onChange={e => {
          searchJob(e.target.value);
        }}
      />
      <h3 className="jobs-found-heading">
        <span className="jobs-found-text">
          <span className="jobs-found-amount">{jobsFound?.length}</span> jobs
          found for
        </span>
        <span className="jobs-found-value">
          <span className="jobs-found-quote">"</span>
          <span>{searchInputValue}</span>
          <span className="jobs-found-quote">"</span>
        </span>
      </h3>
      {jobsFound?.length > 0
        ? jobsFound.map(job => <SingleJob job={job} key={job.id} />)
        : null}
    </section>
  );
};
export default SearchJobs;
