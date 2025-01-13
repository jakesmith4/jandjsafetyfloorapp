// components
import CompletedJobs from './components/CompletedJobs';
import CurrentJob from './components/CurrentJob';
import CurrentOwner from './components/CurrentOwner';
import Home from './components/Home';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import { useGlobalContext } from './context';

function App() {
  const {
    isHomeOpen,
    isCurrentOwnerOpen,
    isCurrentJobOpen,
    isCompletedJobsOpen,
  } = useGlobalContext();

  return (
    <main>
      <Sidebar />
      {isHomeOpen && <Home />}
      {isCurrentOwnerOpen && <CurrentOwner />}
      {isCurrentJobOpen && <CurrentJob />}
      {isCompletedJobsOpen && <CompletedJobs />}
      <Modal />
    </main>
  );
}

export default App;
