import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './Components/NavBar';

import ThreeBody from './Pages/ThreeBody';

function App() {
  return (
    <Router>
    <NavBar />
    <Routes>
        <Route path='/' element={<h1>HELLO WORLD</h1>} />
        <Route path='/threebody' element={<ThreeBody/>} />
    </Routes>
    </Router>
  );
}

export default App;
