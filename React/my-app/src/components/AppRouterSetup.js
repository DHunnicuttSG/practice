import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contacts from './components/Contacts';
import CompanyInfo from './components/CompanyInfo';

const App = () => {
  return (
    <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/company-info' element={<CompanyInfo/>}/>
    </Routes>
  );
};

export default App;
