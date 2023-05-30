import './App.css';
import Main from './components/Main';
import Projects from './components/projects';
import Navbar from './components/navbar';
import Admin from './components/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <br/>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
