import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Medicine from './Components/Medicine';


function App() {
  return (
    <div className="container mt-3">
      <h1 className="text-center">Medicine Reminder App</h1>
      <Medicine />
    </div>
  );
}

export default App;
