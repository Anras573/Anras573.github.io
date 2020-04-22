import React from 'react';
import './App.css';
import Header from '../header';
import About from '../../routes/about';
import Home from '../../routes/home';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
}

export default App;
