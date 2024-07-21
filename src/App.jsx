// components
import CurrentOwner from './components/CurrentOwner';
import Home from './components/Home';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import { useGlobalContext } from './context';

function App() {
  const { isHomeOpen, isCurrentOwnerOpen } = useGlobalContext();

  return (
    <main>
      <Sidebar />
      {isHomeOpen && <Home />}
      {isCurrentOwnerOpen && <CurrentOwner />}
      <Modal />
    </main>
  );
}

export default App;
