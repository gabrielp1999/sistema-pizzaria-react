import './App.css';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import RegisteredPizzas from './Components/RegisteredPizzas';
import RegisterPizzas from './Components/RegisterPizzas';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState({
    nome:'',
    ingredient1:'',
    ingredient2:'',
    ingredient3:'',
    ingredient4:'',
    img:''
  });

  useEffect(() => {
    localStorage.setItem('pizzas',JSON.stringify(pizzas));
  }, [pizzas]);

  
  const getIngred = (e, ingre) =>{
    setPizza({
      ...pizza,
      [ingre]: e.target.value
    })
  }

  const save = () => {
    if(pizza.nome !== '' && pizza.ingredient1 !== '' && pizza.ingredient2 !==''  && pizza.ingredient3 !== '' && pizza.ingredient4 !== ''){
     setPizzas([...pizzas, pizza]);
      alert("salvou :)")
    }else{
      alert("input vazio :/")
    }
  }

  return (
    <Router>
      <div className='app'>
        <nav className='navbar'>
          <ul>
            <li>
              <Link to="/">Cadastrar Pizza</Link>
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
              element={
                <RegisterPizzas 
                  getIngred={getIngred}
                  save={save}
                />}
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
