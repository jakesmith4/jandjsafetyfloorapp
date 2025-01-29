import { useGlobalContext } from '../context';
import { convertDateOneDayForward } from '../utils';
import SingleJob from './SingleJob';

const CurrentJob = () => {
  const { owners, currentSingleJob } = useGlobalContext();

  const currentDate = new Date();

  // currentDate.setHours(4, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const currentTime = currentDate.getTime();

  const newItemsArray = [];

  for (let item of owners.values()) {
    newItemsArray.push(item.jobs);
  }

  const allJobs = newItemsArray.flatMap(job => job);

  const todaysJobs = allJobs.filter(
    job => convertDateOneDayForward(job.date).getTime() === currentTime
  );

  if (currentSingleJob) {
    return (
      <section className="current-owner">
        <h1 className="single-job-heading">current selected job</h1>
        <SingleJob job={currentSingleJob} />
      </section>
    );
  }

  if (todaysJobs.length === 0) {
    return (
      <section className="current-owner">
        <header>
          <h2>no jobs for today</h2>
        </header>
      </section>
    );
  }
  return (
    <section className="current-owner">
      <h1 className="single-job-heading single-job-heading-today">
        <span>todays jobs</span>
        <span className="single-job-heading-today-amount">
          {todaysJobs.length}
        </span>
      </h1>
      {todaysJobs.map(job => (
        <SingleJob key={job.id} job={job} />
      ))}
    </section>
  );
};
export default CurrentJob;
