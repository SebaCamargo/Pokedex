import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokeDetail from './components/pokeDetail/pokeDetail';
import { GlobalStyle } from './components/globalstyle/globalstyle';
import { ThemeProvider } from './components/theme-context/themeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokeDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
