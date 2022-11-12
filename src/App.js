import React from 'react';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-gray-100">
      <Navbar></Navbar>
      <Header></Header>
      <Experience></Experience>
      <Skills></Skills>
      <Education></Education>
      <Certifications></Certifications>
      <Contact></Contact>
    </div>
  );
}

export default App;
