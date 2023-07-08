import React, { useEffect, useState, useRef } from 'react'
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Link } from 'react-router-dom';
import phrases from './components/library.js';


function Accueill() {
  return (
    <div className='Accueill'>
      <Link className="linki" to="/game"><button type='button'>game</button></Link>
    </div>
  )
}

function Game() {
  const [show, setShow] = useState(false)
  const [randomP, setRandomP] = useState('')

  const generate = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[randomIndex]
    return phrase
  }

  
  const handleEnter = (event) => {
    if (show === false){
      setRandomP(generate() )
      setShow(true);
      
    }
  }
  const i = useRef(0)
  const startGame = (event) => {
    const couleurChar = document.getElementById('char-' + i.current)
      if (randomP[i.current] === event.key) {
        if (couleurChar) {
          couleurChar.style.color = 'green'
          couleurChar.style.fontSize = '45px'
        }
        i.current += 1
      }
      else {
        console.log(randomP[i.current] + ' = ' + event.key)
        if (couleurChar)
          couleurChar.style.color = "red"
      }
    
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleEnter);
    document.body.addEventListener('keydown', startGame);
    
    return () => {
      document.body.removeEventListener('keydown', handleEnter)
      document.body.removeEventListener('keydown', startGame);
      
    };
  }, [show, randomP]);

  return (
    <div className='gamet'>
      <div className='header'>
        <h1>Hit the keys</h1>
      </div>
      <h4>Press any key</h4>
      {show && <h4>{[...randomP].map((char, index) => (
        <span id={'char-' + index} key={index}>
          {char}
        </span>
      ))}
      </h4>}
      
    </div>
    
  )
}


function App() {
  return (
    <div className="App">
      <Router >
      
      
        <Routes>
           
          <Route path="/" Component={Accueill}/>
          <Route path="/game" Component={Game}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
