import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/layout.scss';
import Host from './pages/Host';
import Signin from './pages/Signin';
import Bingo from './pages/bingo';
import Game from './pages/game';
import Check from './pages/check';
import PreGame from './pages/pre-game';
import InfoPage from './pages/info-page';
import ShowStats from './pages/show-stats';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/host" element={<Host />}/>
          <Route path="/" element={<Signin />}/>
          <Route path="/bingo" element={<Bingo />}/>
          <Route path="/game" element={<Game />}/>
          <Route path='/check' element={<Check />}/>
          <Route path='/pre-game' element={<PreGame />}/>
          <Route path='/info-page' element={<InfoPage />}/>
          <Route path='/show-stats' element={<ShowStats />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
