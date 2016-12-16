import {
  AUTH_USER,
  LOCK
}from '../actions/types';

const INITIAL_STATE = {
  authenticated:false,
  lock:null
}
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case AUTH_USER:
      return {...state, authenticated:action.payload}
    case LOCK:
      return {...state, lock:action.payload}
  }

  return state;
}
