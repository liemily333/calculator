import React from 'react';
import { ACTIONS } from './actions';

export default function reducer(state, { type, payload }) {
  function evaluate({ currentValue, previousValue, operation }) {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return '';
    let computation = '';
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '/':
        computation = prev / current;
        break;
      case '*':
        computation = prev * current;
        break;
    }
    return computation.toString();
  }

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      //after hitting equal sign you want to overwrite the values and start calculation again
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false,
        };
      }
      //to diallow user from hitting multiple 0 in the beginning of calculation
      if (payload.digit === '0' && state.currentValue === '0') return state;

      return {
        ...state,
        currentValue: `${state.currentValue || ''}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      //to check the users first click is not an operator
      if (state.currentValue == null && state.previousValue == null) {
        return state;
      }
      // make currentValue to the previousValue and the operation can be saved
      if (state.previousValue == null) {
        return {
          ...state,
          operation: payload.operation,
          previousValue: state.currentValue,
          currentValue: null,
        };
      }
      //override previous operation if the user wants to change operation,
      if (state.currentValue == null) {
        return { ...state, operation: payload.operation };
      }

      //default
      return {
        ...state,
        previousValue: evaluate(state),
        operation: payload.operation,
        currentValue: null,
      };
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EQUALS:
      //if any of the state is empty then do nothing. ex: "15 - "" it's missing the currentValue
      if (
        state.operation == null ||
        state.currentValue == null ||
        state.previousValue == null
      ) {
        return state;
      }
      //default
      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operation: null,
        currentValue: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      //if overwrite is true then there is nothing to delete
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentValue: null,
        };
      }
      //if there's nothing in the current value just return the state
      if (state.currentValue == null) return state;
      // clear current value if there's only one digit
      if (state.currentValue.length === 1) {
        return { ...state, currentValue: null };
      }
      //default
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };
  }
}
