import React, { useEffect, useState } from 'react'
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
  const [enter, setEnter] = useState('')
  const [show, setShow] = useState(false)
  

  const generate = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[randomIndex]
    return phrase
  }


  const handleEnter = (event) => {  
    setShow(true);    
  }

  
  const randomP = generate()
  const [i,setI] = useState(0)

  useEffect(() => {
    document.body.addEventListener('keyup', handleEnter);
  
    const startGame = (event) => {
      console.log(randomP)
      if (randomP[i] === event.key) {
        setI(i + 1) 
      }
      
    }

    document.body.addEventListener('keydown', startGame);
    
    return () => {
      document.removeEventListener('keydown', startGame);
      document.removeEventListener('keyup', handleEnter)
    };
  }, []);

  

 

  return (
    <div className='gamet' onKeyUp={handleEnter} tabIndex={0}>
      <div className='header'>
        <h1>Hit the keys</h1>
      </div>
      <h4>Press any key</h4>
      {show && <h4>{randomP}</h4>}
      
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
