import React from "react";

function RegisterPizzas(props){

  return(
    <div className="formCompo">
      <h1>Cadastrar Pizzas</h1>
      <div className="form">
        <input 
          placeholder="pizza" 
          onChange={(e) => props.getIngred(e, 'nome')} 
        />
        <input 
          placeholder="ingrediente 1" 
          onChange={(e) => props.getIngred(e, 'ingredient1')}
        />
        <input placeholder="ingrediente 2" 
          onChange={(e) => props.getIngred(e, 'ingredient2')}
        />
        <input 
          placeholder="ingrediente 3"
          onChange={(e) => props.getIngred(e, 'ingredient3')}
        />
        <input 
          placeholder="ingrediente 4"
          onChange={(e) => props.getIngred(e, 'ingredient4')}
        />
        <input 
          placeholder="link da imagem"
          onChange={(e) => props.getIngred(e, 'img')}
        />
        <div>
          <button onClick={props.save}>Salvar</button>
          <button onClick={props.saveAdd}>Salvar e adicionar</button>
        </div>

      </div>
    </div>
  )
}

export default RegisterPizzas;