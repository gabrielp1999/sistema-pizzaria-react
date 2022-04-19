import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

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

function RegisterPizzas(){
  const { id } = useParams();
  let navigate = useNavigate();
  const [pizzas, setPizzas] = useState(JSON.parse(localStorage.getItem("pizzas")) || []);
  const [pizza, setPizza] = useState(DEFAULT_STATE);
  const [saveAndNew, setSaveAndNew] = useState(false);
  const [sweetAlertState, setSweetAlertState] = useState(false);
  const [sweetAlertErro, setSweetAlertErro] = useState(false);
  
  useEffect(() => {
    if(pizzas.length > 0){
      localStorage.setItem('pizzas',JSON.stringify(pizzas));
    }
  }, [pizzas]);

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

  const save = (isSaveAndNew) => {
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
      }else{// adicao / cadastro
        setPizzas([...pizzas, {
          ...pizza,
          id: generateNumber(),
        }]);
      }
      setSweetAlertState(true);
      setSaveAndNew(isSaveAndNew);
    }else{
      setSweetAlertErro(true);
      // alert("input vazio :/");
    }
  }

  const onConfirmErro = () => {
    setSweetAlertErro(false);
  }

  const newSave = () => {
    save(true);
    setPizza(DEFAULT_STATE);
  }

  const onConfirm = () => {
    setSweetAlertState(false);
    if(!saveAndNew) {
      navigate('/registeredpizzas');
    }
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
          <button className="buttons" onClick={() => save(false)}>Salvar</button>

          {!id ? <button className="buttons"  onClick={() => newSave()}>Salvar e novo</button> : null}
          
        </div>

      </div>

      {sweetAlertState && (
        <SweetAlert 
          title="Pizza salva com sucessoo" 
          onConfirm={() => onConfirm()}/>
        )}

      {sweetAlertErro && (
        <SweetAlert 
          warning
          title="input vazio :/" 
          onConfirm={() => onConfirmErro()}/>
        )}
    </div>
  )
}

export default RegisterPizzas;