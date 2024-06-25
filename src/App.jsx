import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainContent from './components/MainContent/MainContent';
import Sidebar from './components/Sidebar/Sidebar';
import ApolloProvider from './context/ApolloProvider';
import Home from './screens/Home/Home';
import Vista1 from './screens/Vista1/Vista1';
import Vista2 from './screens/Vista2/Vista2';

// Componente principal de la aplicación
const App = () => {
  return (
    <ApolloProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vista1" element={<Vista1 />} />
              <Route path="/vista2" element={<Vista2 />} />
            </Routes>
          </MainContent>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
