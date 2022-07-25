import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './Components/NavBar';

import Home from './Pages/Home';
import ThreeBody from './Pages/ThreeBody';

function App() {
  return (
    <Router>
    <NavBar />
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/threebody' element={<ThreeBody/>} />
    </Routes>
    </Router>
  );
}

export default App;
