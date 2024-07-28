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

  console.log(todaysJobs);

  if (currentSingleJob) {
    console.log(currentSingleJob);
    return (
      <section className="current-owner">
        {/* {currentSingleJob.storeNumber} */}
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
