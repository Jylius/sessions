import logo from './logo.svg';
import './App.css';
import Navi from './Navi';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Navi></Navi>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          do something
        </a>
        <MyButton />
      </header>
    </div>
  )
}
function MyButton(){
  return(
    <button>Ben bir butonum</button>
  );
}
export default App;
