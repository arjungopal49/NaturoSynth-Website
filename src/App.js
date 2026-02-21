import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
  from 'react-router-dom';
import Home from './pages/home';
import Discography from './pages/discography';
import Shows from './pages/shows';
import Merch from './pages/merch';
import Contact from './pages/contact';
import TestEPKPage from './pages/testEpk';

function App() {
  return (
      <div className="App">
          <Router>

            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/discography' element={<Discography/>} />
              <Route path='/shows' element={<Shows/>} />
              <Route path='/merch' element={<Merch/>} />
              <Route path='/epk' element={<TestEPKPage/>} />
              <Route path='/contact' element={<Contact/>} />
            </Routes>
          </Router>
      </div>
  );
}

export default App;
