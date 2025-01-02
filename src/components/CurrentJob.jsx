import { useGlobalContext } from '../context';
import SingleJob from './SingleJob';

const CurrentJob = () => {
  const { owners, currentSingleJob } = useGlobalContext();

  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  const currentTime = currentDate.getTime();

  const newItemsArray = [];

  for (let item of owners.values()) {
    newItemsArray.push(item.jobs);
  }

  const allJobs = newItemsArray.flatMap(job => job);

  const todaysJobs = allJobs.filter(
    job => job.dateObject.getTime() === currentTime
  );

  if (currentSingleJob) {
    return (
      <section className="current-owner">
        <h1>current selected job</h1>
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
      <h1>todays jobs</h1>
      {/* <header></header>

      <footer>
        <hr />
      </footer> */}
      {todaysJobs.map(job => (
        <SingleJob key={job.id} job={job} />
      ))}
    </section>
  );
};
export default CurrentJob;
