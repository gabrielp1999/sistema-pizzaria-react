import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import RegisteredPizzas from './Components/RegisteredPizzas';
import RegisterPizzas from './Components/RegisterPizzas';

function App() {
  document.title = 'Sistema pizzaria react';
 
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className='app'>
        <nav className='navbar'>
          <ul>
            <li>
              <Link to="/"><h4>Cadastrar Pizza</h4></Link>
            </li>
            <li>
              <Link to="/registeredpizzas"><h4>Pizzas Cadastrada</h4></Link>
            </li>
          </ul>
        </nav>
        <main className='container'>
          <Routes>
            <Route  
              path="/" 
              element={
              <RegisterPizzas />}
            />
              <Route 
                path="/registeredpizzas" 
                element={<RegisteredPizzas />} 
              />
              <Route  
                path="/editar/:id" 
                element={
                <RegisterPizzas />}
              />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
