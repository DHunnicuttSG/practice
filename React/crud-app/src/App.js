// import './App.css';
import CreateContact from './components/create';
import ReadContacts from './components/Read';
import UpdateContact from './components/Update';
import DeleteContact from './components/Delete';

function App() {
  return (
    <div className="App">
      <CreateContact />
      <hr/>
      <UpdateContact />
      <hr/>
      <DeleteContact/>
      <hr/>
      <ReadContacts/>
    </div>
  );
}

export default App;
