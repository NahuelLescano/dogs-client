import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Form from './components/Form/Form';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/details/:id' element={<Details />} />
        <Route exact path='/form' element={<Form />} />
      </Routes>
    </div>
  );
}
