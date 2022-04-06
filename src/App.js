import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import RegisteredPizzas from './Components/RegisteredPizzas';
import RegisterPizzas from './Components/RegisterPizzas';

function App() {
  return (
    <Router>
      <div className='app'>
        <nav className='navbar'>
          <ul>
            <li>
              <Link to="/" exact>Cadastrar Pizza</Link>
            </li>
            <li>
              <Link to="/registeredpizzas">Pizzas Cadastrada</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route  
              path="/" 
              element={<RegisterPizzas />}
            />

            <Route 
              path="/registeredpizzas" 
              element={<RegisteredPizzas />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
