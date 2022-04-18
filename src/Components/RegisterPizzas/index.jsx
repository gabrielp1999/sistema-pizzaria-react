import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

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
  return  Math.floor(Math.random() * 200);
}

// mudar o titulo conforme o id recebido
// ocultar o botão de add e novo quando for edição
// setar a variavel de estado com as informação da pizza do id da url
// quando for um cadastro preencher a variavel de estado com default state

function RegisterPizzas(){
  const { id } = useParams();
  let navigate = useNavigate();
  const [pizzas, setPizzas] = useState(JSON.parse(localStorage.getItem("pizzas")) || []);
  const [pizza, setPizza] = useState(DEFAULT_STATE);
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    if(pizzas.length > 0){
      localStorage.setItem('pizzas',JSON.stringify(pizzas));
    }
    if(redirect){
      navigate('/registeredpizzas');
    }
  }, [pizzas, redirect]);

  useEffect(() => {
    if(id !== undefined){
      const pizzaLocalStorage = JSON.parse(localStorage.getItem("pizzas")) || [];
      const getPizza = pizzaLocalStorage.find(pizza  => {
        return pizza.id.toString() === id.toString();
      });
      setPizza({
        id:getPizza.id,
        nome:getPizza.nome,
        ingredient1:getPizza.ingredient1,
        ingredient2:getPizza.ingredient2,
        ingredient3:getPizza.ingredient3,
        ingredient4:getPizza.ingredient4,
        img:getPizza.img
      });
    }else{
      setPizza(DEFAULT_STATE);
    }

  }, [id]);


  const getPizza = (e, ingredient) =>{
    setPizza({
      ...pizza,
      [ingredient]: e.target.value
    })
  }

  const save = (needRedirect) => {
    if(pizza.nome !== '' && pizza.ingredient1 !== '' && pizza.ingredient2 !== ''  && pizza.ingredient3 !== '' && pizza.ingredient4 !== ''){
      if(id !== undefined){// edicao
        const editedPizza = pizzas.map(item => {
          if(item.id.toString() === id.toString()){
            return {
              id: id,
              nome: pizza.nome,
              ingredient1: pizza.ingredient1,
              ingredient2: pizza.ingredient2,
              ingredient3: pizza.ingredient3,
              ingredient4: pizza.ingredient4,
              img: pizza.img
            }
          }
          return item;
        });
        setPizzas(editedPizza);
        alert("salvo com sucesso :)");
      }else{// adicao / cadastro
      
          setPizzas([...pizzas, {
            ...pizza,
            id: generateNumber(),
          }]);
          alert("salvo com sucesso :)");
    }

    setRedirect(needRedirect);
    }else{
      alert("input vazio :/");
    }
  }

  const newSave = () => {
    save(false);
    setPizza(DEFAULT_STATE);
  }

  if(pizzas === '' || pizzas === undefined){
    return null;
  }

  return(
    <div className="formCompo">
      <h1 className="title">{id ? 'Editar Pizza' : 'Cadastrar Pizza'}</h1>
      <div className="form">
        <input 
          placeholder="pizza" 
          className="inputs"
          value={pizza.nome}
          onChange={(e) => getPizza(e, 'nome')} 
        />
        <input 
          placeholder="ingrediente 1" 
          className="inputs"
          value={pizza.ingredient1}
          onChange={(e) => getPizza(e, 'ingredient1')}
        />
        <input 
          placeholder="ingrediente 2" 
          className="inputs"
          value={pizza.ingredient2}
          onChange={(e) => getPizza(e, 'ingredient2')}
        />
        <input 
          placeholder="ingrediente 3"
          className="inputs"
          value={pizza.ingredient3}
          onChange={(e) => getPizza(e, 'ingredient3')}
        />
        <input 
          placeholder="ingrediente 4"
          className="inputs"
          value={pizza.ingredient4}
          onChange={(e) => getPizza(e, 'ingredient4')}
        />
        <input 
          placeholder="link da imagem"
          className="inputs"
          value={pizza.img}
          onChange={(e) => getPizza(e, 'img')}
        />
        <div>
          <button className="buttons" onClick={() => save(true)}>Salvar</button>

          {!id ? <button className="buttons"  onClick={() => newSave()}>Salvar e novo</button> : null}
          
        </div>

      </div>
    </div>
  )
}

export default RegisterPizzas;