import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './components/routing/Home'
import Contacts from './components/routing/Contacts';
import CompanyInfo from './components/routing/CompanyInfo';
import FetchDataComponent from './components/routing/SimpleFetch';


function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/contacts' element={<Contacts/>} />
      <Route path='/company-info' element={<CompanyInfo/>} />
      <Route path='/fetch' element={<FetchDataComponent/>} />
    </Routes>
  );
}

export default App;
