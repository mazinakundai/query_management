import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QueryInbox from './pages/QueryInbox';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<QueryInbox />} />
      </Routes>
    </Router>
  );
}

export default App;
