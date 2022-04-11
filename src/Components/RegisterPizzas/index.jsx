import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_STATE = {
  id: null,
  nome:'',
  ingredient1:'',
  ingredient2:'',
  ingredient3:'',
  ingredient4:'',
  img:''
};
const generateNumber = () =>{
  return  Math.floor(Math.random() * 90);
}

function RegisterPizzas(){
  let navigate = useNavigate();
  const [pizzas, setPizzas] = useState(JSON.parse(localStorage.getItem("pizzas")) || []);
  const [pizza, setPizza] = useState(DEFAULT_STATE);
  
  useEffect(() => {
    if(pizzas.length !== 0){
      localStorage.setItem('pizzas',JSON.stringify(pizzas));
    }
  }, [pizzas]);
  
  const getIngred = (e, ingre) =>{
    setPizza({
      ...pizza,
      [ingre]: e.target.value
    })
  }
  
  const save = () => {
    if(pizza.nome !== '' && pizza.ingredient1 !== '' && pizza.ingredient2 !==''  && pizza.ingredient3 !== '' && pizza.ingredient4 !== ''){
      
      setPizzas([...pizzas, {
        ...pizza,
        id: generateNumber(),
      }]);
      alert("salvo com sucesso :)")
      navigate("/registeredpizzas");
    }else{
      alert("input vazio :/")
    }
  }
  const newSave = () => {
    save();
    setPizza(DEFAULT_STATE);
  }

  if(pizzas === '' || pizzas === undefined){
    return null;
  }
  return(
    <div className="formCompo">
      <h1 className="title">Cadastrar Pizzas</h1>
      <div className="form">
        <input 
          placeholder="pizza" 
          className="inputs"
          value={pizza.nome}
          onChange={(e) => getIngred(e, 'nome')} 
        />
        <input 
          placeholder="ingrediente 1" 
          className="inputs"
          value={pizza.ingredient1}
          onChange={(e) => getIngred(e, 'ingredient1')}
        />
        <input 
          placeholder="ingrediente 2" 
          className="inputs"
          value={pizza.ingredient2}
          onChange={(e) => getIngred(e, 'ingredient2')}
        />
        <input 
          placeholder="ingrediente 3"
          className="inputs"
          value={pizza.ingredient3}
          onChange={(e) => getIngred(e, 'ingredient3')}
        />
        <input 
          placeholder="ingrediente 4"
          className="inputs"
          value={pizza.ingredient4}
          onChange={(e) => getIngred(e, 'ingredient4')}
        />
        <input 
          placeholder="link da imagem"
          className="inputs"
          value={pizza.img}
          onChange={(e) => getIngred(e, 'img')}
        />
        <div>
          <button className="buttons" onClick={() => save()}>Salvar</button>
          <button className="buttons"  onClick={() => newSave()}>Salvar e adicionar</button>
        </div>

      </div>
    </div>
  )
}

export default RegisterPizzas;