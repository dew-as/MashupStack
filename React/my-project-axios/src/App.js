// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import MainContent from './MainContent'
import Home from "./components/Home"

function App() {
  const [name, setName] = useState('Aswin')
  const handleChange = (setLastName) => {
    setName(name + ' ' + setLastName)
  }
  const handleLastNameChange = (setLastName) => {
    setLastName(" Dev")
  }
  useEffect(() => {
    console.log(name);
  }, [name])

  return (
    <div>
      <Header />
      {/* <MainContent name={name} changeLastName={handleLastNameChange} assignLastName={handleChange} setName={setName} >
        <h1>Mashupstack</h1>
      </MainContent> */}
      <Home />
      <Footer />
    </div>
  )
}

export default App;