import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import MD5Generator from './MD5Generator';
import Menu from './Menu';
import TrangTru from './trangtru'; // Ensure the casing matches the file name

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div style={{ marginLeft: '260px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<MD5Generator />} /> {/* Default route */}
            <Route path="/trangtru" element={<TrangTru />} /> {/* TrangTru route */}
            <Route path="/MD5Generator" element={<MD5Generator />} /> {/* TrangTru route */}
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
