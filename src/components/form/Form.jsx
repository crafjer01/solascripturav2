import { useState } from 'react';
import './form.css';

export const Form = ({ game, setGame }) => {
  const [secondToAnswer, setSecondToAnswer] = useState(30);

  const onSecondToAnswerChange = ({ target }) => {
    setSecondToAnswer(target.value);
  }

  return (
    <form className="form">
      <div className="form-title">
        <h2>Inicialización del juego</h2>
      </div>

      <div className="fields_container">
        <div className="field">
          <input type="text" className="input" placeholder="Selecione número de rondas"/>
        </div>
        <div className="field">
          <input type="text" className="input mr-0" placeholder="Selecione número de preguntas"/>
        </div>
      </div>
      <div className="fields_container">
        <div className="field_participants">
          <input type="text" className="input" placeholder="Agregar participantes"/>
          <button className="add_button">
              <i className="material-icons">person_add</i>
          </button>
          
        </div>
        <div className="field-range">
          <div className="response-container">
              <label>Cantidad segundos para responder</label>
              <span>{ secondToAnswer }</span>
          </div>
          
          <input type="range" min="30" max="180" step="5" className="input mr-0" placeholder="Seleciona número de preguntas"
            value={secondToAnswer}
            onChange={ onSecondToAnswerChange }
          />
        </div>
      </div>
      <div className="button_start_game">
              <button className="start">Iniciar Juego</button>
              <button className="cancel">Cancelar</button>
         </div>
    </form>
  )
}
