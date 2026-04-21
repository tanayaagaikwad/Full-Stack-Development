import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Marketplace from './components/Marketplace';
import Feedback from './components/Feedback';
import Booking from './components/Booking';
import content from './constants';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');
  const copy = content[lang];

  return (
    <Router>
      <div className="app-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">{copy.academicBadge}</p>
            <h1 className="brand">{copy.brand}</h1>
            <p className="tagline">{copy.tagline}</p>
          </div>
          <div className="language-box">
            <span>{copy.languageLabel}</span>
            <button className="language-toggle" onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}>
              {copy.toggleLanguage}
            </button>
          </div>
        </header>

        <nav className="navbar">
          <Link to="/">{copy.home}</Link>
          <Link to="/marketplace">{copy.marketplace}</Link>
          <Link to="/booking">{copy.booking}</Link>
          <Link to="/feedback">{copy.feedback}</Link>
        </nav>

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/marketplace" element={<Marketplace lang={lang} />} />
            <Route path="/feedback" element={<Feedback lang={lang} />} />
            <Route path="/booking" element={<Booking lang={lang} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
