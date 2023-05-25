import './App.css';
import Main from './components/Main';
import Projects from './components/projects';
import Navbar from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <br/>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
