import react from 'react';
import { ACTIONS } from './actions';

export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      className="button"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
