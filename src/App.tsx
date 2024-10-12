import React, { useEffect, useState } from 'react';
import './App.css';
import Req from './Req';
import Polish from './langs/Polish';
import English from './langs/English';

function App() {
  const [lang, setLang] = useState("none");
  return (
    <div className="App">
      {lang === 'none' && 
      <div className="content">
        <h3>CHOOSE LANGUAGE</h3>
        <p className='p-btn' onClick={() => setLang('en')}>ENGLISH</p>
        <p className='p-btn' onClick={() => setLang('pl')}>POLSKI</p>
      </div>
      }
      {lang === 'en' &&
      <English />
      }
      {lang === 'pl' &&
      <Polish />
      }
      <footer>Project made for fun by <a href='https://github.com/prewcio/easyRPGEditor'>Prewcio</a> 🎮</footer>
    </div>
  );
}

export default App;
