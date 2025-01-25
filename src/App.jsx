// components
import CompletedJobs from './components/CompletedJobs';
import CurrentJob from './components/CurrentJob';
import CurrentOwner from './components/CurrentOwner';
import Home from './components/Home';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import { useGlobalContext } from './context';
import { ToastContainer, toast } from 'react-toastify';

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
      <ToastContainer position="top-center" theme="dark" />
    </main>
  );
}

export default App;
