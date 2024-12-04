import './App.css';
import { Route, Routes} from 'react-router-dom'
import Home from './components/routing/Home'
import Contacts from './components/routing/Contacts'
import CompanyInfo from './components/routing/CompanyInfo'
import SimpleFetch from './components/routing/SimpleFetch'

function App() {

  return (
    <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/company-info' element={<CompanyInfo/>}/>
          <Route path='/fetch' element={<SimpleFetch/>}/>
    </Routes>
  );
}

// notes:
/*
  Need to add <BrowserRouter> to the index.js file 
  use import { BrowserRouter } from 'react-router-dom';
  Make the file look like this:
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

  also need to remove any <div> tags in App component
*/
export default App;
