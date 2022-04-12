import React, { useState, useEffect } from "react";
function RegisteredPizzas(){
  const [pizzas, setPizzas] = useState(JSON.parse(localStorage.getItem("pizzas")) || []);
  
  useEffect(() => {
    const pizzaLocalStorage = JSON.parse(localStorage.getItem("pizzas")) || [];
    if (pizzas.length || pizzaLocalStorage.length)
      localStorage.setItem("pizzas", JSON.stringify(pizzas));
  }, [pizzas]);
  
  const removePizza = (id) => {
    const newArray = pizzas.filter((pizza)=> {
      return pizza.id !== id;
    });
    setPizzas(newArray);
  }

  if(!pizzas && !pizzas?.length){
    return <h2>Nenhuma pizza cadastrada :/</h2>;
  }

  return(
    <div>
      <h1>Pizzas Cadastradas</h1>
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
            <td>excluir</td>
          </tr>

        {pizzas.map((pizza) => (
          <tr key={pizza.id}>
            <td>{pizza.nome}</td>
            <td>{pizza.ingredient1}</td>
            <td>{pizza.ingredient2}</td>
            <td>{pizza.ingredient3}</td>
            <td>{pizza.ingredient4}</td>
            <td> <img className="photo" src={pizza.img} /> </td>
            <td>
              <button
                className="buttons">Editar
              </button>
            </td>
            <td>
              <button 
                className="buttons">Excluir
                onClick={() => removePizza(pizza.id)} 
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default RegisteredPizzas;