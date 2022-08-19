import './App.css';
import {Link, Outlet} from 'react-router-dom'


function App() {
  return (
    <div className="App">
        <nav>
          <div className="logo"></div>
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>
        <Outlet />
    </div>
  );
}

export default App;
