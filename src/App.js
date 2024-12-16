import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MD5Generator from './MD5Generator';
import Menu from './Menu';
import TrangTru from './trangtru';
import FileMD5 from './fileMD5';
import Chukyso from './chukyso';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div style={{ marginLeft: '260px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<MD5Generator />} /> {/* Default route */}
            <Route path="/trangtru" element={<TrangTru />} />
            <Route path="/MD5Generator" element={<MD5Generator />} />
            <Route path="/fileMD5" element={<FileMD5 />} /> {/* Route for FileMD5 */}
            <Route path="/chukyso" element={<Chukyso />} /> {/* Route for FileMD5 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
