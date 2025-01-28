import { useGlobalContext } from '../context';
import SingleJob from './SingleJob';

const CompletedJobs = () => {
  const { searchJob, jobsFound, searchInputValue } = useGlobalContext();

  jobsFound?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="completed-jobs current-owner">
      <input
        type="text"
        id="search"
        value={searchInputValue}
        onChange={e => {
          searchJob(e.target.value);
        }}
      />
      <h2>
        {jobsFound?.length} jobs found for "{searchInputValue}"
      </h2>
      {jobsFound?.length > 0
        ? jobsFound.map(job => <SingleJob job={job} key={job.id} />)
        : null}
    </section>
  );
};
export default CompletedJobs;
