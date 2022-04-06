import React from 'react';
import logo from './logo.svg';
import './App.css';
import { generateMockData } from "./utils/mockDataGenerator"

function App() {
  generateMockData()
  return (
    <div className="App">

    </div>
  );
}

export default App;
