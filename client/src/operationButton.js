import react from 'react';
import { ACTIONS } from './actions';

export default function OperationButton({ dispatch, operation }) {
  return (
    <div>
      <button
        className="button"
        onClick={() =>
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
        }
      >
        {operation}
      </button>
    </div>
  );
}
