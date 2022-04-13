import React, { useState, useEffect } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

function RegisteredPizzas(){
  const [pizzas, setPizzas] = useState(JSON.parse(localStorage.getItem("pizzas")) || []);
  const [pizzasForFilter, setPizzasForFilter] = useState(JSON.parse(localStorage.getItem("pizzas")) || []);
  const [sweetAlertState, setSweetAlertState] = useState(false);
  const [parametEcluir, setparametEcluir] = useState();
  const [pizzaEdit, setPizzaEdit] = useState();
  
  useEffect(() => {
    localStorage.setItem("pizzas", JSON.stringify(pizzas));
  }, [pizzas,sweetAlertState]);
  
  const searchPizza = e => {
    const pizzaLocalStorage = JSON.parse(localStorage.getItem("pizzas")) || [];
    const filterPizza = pizzaLocalStorage.filter( pizza => {
      const result = pizza.nome.indexOf(e.target.value);
      
      const resp = result < 0 ?  false : true;
      return resp;
    });
    
    setPizzasForFilter(filterPizza);
  }

  const searchIngredient = e => {
    const pizzaLocalStorage = JSON.parse(localStorage.getItem("pizzas")) || [];
    const filterPizza = pizzaLocalStorage.filter( pizza => {
      const result = pizza.ingredient1.indexOf(e.target.value) && pizza.ingredient2.indexOf(e.target.value) && pizza.ingredient3.indexOf(e.target.value) && pizza.ingredient4.indexOf(e.target.value);
      const resp = result < 0 ?  false : true;
      return resp;
    });
    setPizzasForFilter(filterPizza);
  }

  const onConfirm = () => {
    removePizza(parametEcluir)
    setSweetAlertState(false);
  }
  
  const onCancel = () => {
    setSweetAlertState(false);
  }

  const removePizza = (id) => {
    setSweetAlertState(true);
    setparametEcluir(id)
    if(sweetAlertState === true){
      const newArray = pizzas.filter( pizza => {
        return pizza.id !== id;
      });
      setPizzas(newArray);
      setPizzasForFilter(newArray);
    }
  }

  const editPizza = (id) => {
    const pizzaLocalStorage = JSON.parse(localStorage.getItem("pizzas")) || [];
    const getId = pizzas.find(pizza  => {
      return pizza.id === id;
    });
    console.log({getId});
  }

  if(pizzas.length === 0){
    return <h2>Nenhuma pizza cadastrada :/</h2>;
  }

  return(
    <div>
      <h1>Pizzas Cadastradas</h1>
      <div>
        <label>filtros:</label>
        <input 
          onChange={searchPizza}
          className="inputsFilter"
          placeholder="pesquisar pizza"
          type="text"
        />
        <input
          onChange={searchIngredient}
          className="inputsFilter"
          placeholder="pesquisar por ingrediente"
          type="text"
        />
      </div>
      <table className="table">
        <tbody>
          <tr>
            <td>Pizza</td>
            <td>Ingrediente 1</td>
            <td>Ingrediente 2</td>
            <td>Ingrediente 3</td>
            <td>Ingrediente 4</td>
            <td>Imagem</td>
            <td>Editar</td>
            <td>Excluir</td>
          </tr>

        {pizzasForFilter.map((pizza) => (
          <tr key={pizza.id}>
            <td>{pizza.nome}</td>
            <td>{pizza.ingredient1}</td>
            <td>{pizza.ingredient2}</td>
            <td>{pizza.ingredient3}</td>
            <td>{pizza.ingredient4}</td>
            <td> <img className="photo" src={pizza.img} /> </td>
            <td>
              <button
                onClick={() => editPizza(pizza.id)}
                className="buttons">Editar
              </button>
            </td>
            <td>
              <button 
                onClick={() => removePizza(pizza.id)} 
                className="buttons">Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {sweetAlertState && (
        <SweetAlert 
          title="Deseja mesmo apagar?" 
          className="sweetAlert"
          confirmBtnText="Sim!"
          showCancel
          cancelBtnText="Não"
          confirmBtnBsStyle="danger"
          onConfirm={onConfirm} 
          onCancel={onCancel} 
        />
      )}
    </div>
  )
}

export default RegisteredPizzas;