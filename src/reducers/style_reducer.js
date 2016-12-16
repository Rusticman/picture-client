import {
  AVATAR_FORM_SLIDE,
  PICTURE_FORM_SLIDE,
  HIDE_BROKEN_AVATAR,
  HIDE_BROKEN_IMAGE,
  HOVER_MESSAGE,
  HOVER_BOX_STYLE
}from '../actions/types';

const INITIAL_STATE = {
avatarFormSlide:'-200px',
pictureFormSlide:'-200px',
hideBrokenAvatar:false,
hideBrokenImage:false,
hoverMessage:'',
hoverBoxStyle:{display:'none'}
}
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case AVATAR_FORM_SLIDE:
      return {...state, avatarFormSlide:action.payload}
    case PICTURE_FORM_SLIDE:
      return {...state, pictureFormSlide:action.payload}
    case HIDE_BROKEN_AVATAR:
      return {...state, hideBrokenAvatar:action.payload}
    case HIDE_BROKEN_IMAGE:
      return {...state, hideBrokenImage:action.payload}
    case HOVER_MESSAGE:
      return {...state, hoverMessage:action.payload}
    case HOVER_BOX_STYLE:
      return {...state, hoverBoxStyle:action.payload}
  }

  return state;
}
