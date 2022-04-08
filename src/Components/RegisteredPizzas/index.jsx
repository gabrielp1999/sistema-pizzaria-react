import React, { useState, useEffect } from "react";

function RegisteredPizzas(){
  const pizzaLocalStorage = JSON.parse(localStorage.getItem("pizzas"));
  if(!pizzaLocalStorage && !pizzaLocalStorage.length){
    return null;
  }
 
  return(
    <div>
      <h1>Pizzas Cadastradas</h1>
      <table>
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

      {pizzaLocalStorage.length > 0 ? pizzaLocalStorage.map((e) => (
        <tr>
          <td>{e.nome}</td>
          <td>{e.ingredient1}</td>
          <td>{e.ingredient2}</td>
          <td>{e.ingredient3}</td>
          <td>{e.ingredient4}</td>
          <td><img src={e.img} /></td>
          <td><button>Editar</button></td>
          <td><button>Excluir</button></td>
        </tr>
      )) : null}

    </table>
    </div>
  )
}

export default RegisteredPizzas;