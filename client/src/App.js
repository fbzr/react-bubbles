import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.scss";
// components
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <ProtectedRoute exact path="/bubbles" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
