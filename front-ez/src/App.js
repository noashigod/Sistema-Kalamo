import './App.css';
import Header from "./pages/header/Header";
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import { Routes, Route } from 'react-router-dom';
import PostLocal from "./pages/Editorial/PostEditorial";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/postlocal" element={<PostLocal />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
