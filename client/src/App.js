import './App.css';
import DigitButton from './digitButton';
import OperationButton from './operationButton';
import { useReducer } from 'react';
import reducer from './reducer';
import { ACTIONS } from './actions';

export default function App() {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="App">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {previousValue} {operation}
          </div>
          <div className="current-operand">{currentValue}</div>
        </div>

        <div className="spanTwoButtons">
          <button
            className="span-two"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button
            className="span-two"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            DEL
          </button>
        </div>
        <div className="buttonGroup">
          <OperationButton dispatch={dispatch} operation="+" />
          <DigitButton dispatch={dispatch} digit="1" />
          <DigitButton dispatch={dispatch} digit="2" />
          <DigitButton dispatch={dispatch} digit="3" />
          <OperationButton dispatch={dispatch} operation="-" />
          <DigitButton dispatch={dispatch} digit="4" />
          <DigitButton dispatch={dispatch} digit="5" />
          <DigitButton dispatch={dispatch} digit="6" />
          <OperationButton dispatch={dispatch} operation="*" />
          <DigitButton dispatch={dispatch} digit="7" />
          <DigitButton dispatch={dispatch} digit="8" />
          <DigitButton dispatch={dispatch} digit="9" />
          <OperationButton dispatch={dispatch} operation="/" />
          <DigitButton dispatch={dispatch} digit="." />
          <DigitButton dispatch={dispatch} digit="0" />

          <button
            className="button"
            onClick={() => dispatch({ type: ACTIONS.EQUALS })}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
