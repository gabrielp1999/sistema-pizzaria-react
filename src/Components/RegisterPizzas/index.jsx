import React from "react";

function RegisterPizzas(){
  return(
    <div className="formulario">
      <h1>Cadastrar Pizzas</h1>
      <form>
        <input placeholder="ingrediente 1" />
        <input placeholder="ingrediente 2"/>
        <input placeholder="ingrediente 3"/>
        <input placeholder="ingrediente 4"/>
        <input placeholder="ingrediente 5"/>
        <input placeholder="link da imagem"/>
      </form>
    </div>
  )
}

export default RegisterPizzas;