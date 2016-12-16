import {
  ALL_PICTURES,
  VOTED
}from '../actions/types';

const INITIAL_STATE = {
allPictures:[],
voted:[]
}
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case ALL_PICTURES:
      return {...state, allPictures:action.payload}
    case VOTED:
      return {...state, voted:action.payload}
  }

  return state;
}
