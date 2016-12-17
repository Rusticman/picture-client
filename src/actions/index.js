import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  LOCK,
  ALL_PICTURES,
  AVATAR_FORM_SLIDE,
  PICTURE_FORM_SLIDE,
  VOTED,
  HIDE_BROKEN_AVATAR,
  HIDE_BROKEN_IMAGE,
  HOVER_BOX_STYLE,
  HOVER_MESSAGE,
  LOADED
} from './types';

const ROOT_URL = 'https://picture-board-rustic.herokuapp.com';

export function authLogin(userID,name,provider){
  return function(dispatch){
    axios.post(`${ROOT_URL}/login`, {userID, name, provider})
      .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id);
          dispatch({
            type:AUTH_USER,
            payload:true
          })
          dispatch({
            type:VOTED,
            payload:response.data.voted
          })
      })
      .catch((err) => console.error('caught error',err))
  }
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');

return{
    type:AUTH_USER,
    payload:false
  }

}

export function authLock(lock){

  return{
    type:LOCK,
    payload:lock
  }
}


export function getAllPictures(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/all/pictures`)
    .then(response => {
       dispatch({
         type:LOADED,
         payload:true
       })
        return dispatch({
          type:ALL_PICTURES,
          payload:response.data.allPictures
        })
    })
    .catch(err => console.error('there was an error retrieving pictures'))
  }
}

export function userAvatar(userAvatarURL){
  return function(dispatch){
    axios.post(`${ROOT_URL}/add/user/image`,{userImg:userAvatarURL,id:localStorage.getItem('id')},{
        headers: { authorization: localStorage.getItem('token') }})
    .then(response => {
      dispatch({
        type:ALL_PICTURES,
        payload:response.data.data
      })
    })
    .catch(err => console.error('there was an error changing the user avatar.'))
  }
}

export function avatarFormSlider(boolean){
  if(boolean){
    return{
      type:AVATAR_FORM_SLIDE,
      payload:'0px'
    }
  }
  else{
    return{
      type:AVATAR_FORM_SLIDE,
      payload:'-250px'
    }
  }
}


export function pictureFormSlider(boolean){
  if(boolean){
    return{
      type:PICTURE_FORM_SLIDE,
      payload:'0px'
    }
  }
  else{
    return{
      type:PICTURE_FORM_SLIDE,
      payload:'-250px'
    }
  }
}


export function addPicture(imageName,imageURL){
  return function(dispatch){
    axios.post(`${ROOT_URL}/add/picture`,{id:localStorage.getItem('id'), image:imageURL, imageName:imageName},{
        headers: { authorization: localStorage.getItem('token') }})
    .then(response => {

      dispatch({
        type:ALL_PICTURES,
        payload:response.data.data
      })
    })
    .catch(err => console.error('there was an error adding the image'))
  }
}


export function voteOnImage(pictureID){
  return function(dispatch){
    axios.post(`${ROOT_URL}/vote/image`, {id:localStorage.getItem('id'), pictureID:pictureID},{
        headers: { authorization: localStorage.getItem('token') }})
    .then(response => {
         dispatch({
        type:ALL_PICTURES,
        payload:response.data.allPictures
      })
        dispatch({
          type:VOTED,
          payload:response.data.voted
        })
    })
  }
}


export function hideBrokenAvatarImg(boolean){
  if(boolean){
    return{
      type:HIDE_BROKEN_AVATAR,
      payload:true
    }
  }
  else{
    return{
      type:HIDE_BROKEN_AVATAR,
      payload:false
    }
  }
}

export function removeBrokenImage(pictureID){
return function(dispatch){
  axios.post(`${ROOT_URL}/broken/image`,{pictureID:pictureID})
  .then(response => {

    return dispatch({
      type:ALL_PICTURES,
      payload:response.data.data
    })
  })
  .catch(err => console.error('there was an error changing the broken status of an img'))
}
}

export function deleteImage(pictureID){
  return function(dispatch){
    axios.delete(`${ROOT_URL}/delete/picture/${pictureID}`,{
        headers: { authorization: localStorage.getItem('token') }})
    .then(response => {

      dispatch({
        type:ALL_PICTURES,
        payload:response.data.data
      })
    })
    .catch(err => console.error('there was an error deleting image'))
  }
}

export function triggerHoverMessage(messageType){
  if(messageType === 'delete'){
    return{
      type:HOVER_MESSAGE,
      payload:'delete image'
    }
  }
  else if(messageType === 'like'){
    return{
      type:HOVER_MESSAGE,
      payload:'like this image'
    }
  }
  else if(messageType === 'user'){
    return{
      type:HOVER_MESSAGE,
      payload:'view user\'s images'
    }
  }
}

export function triggerHoverBoxStyle(styleObj){
  return{
    type:HOVER_BOX_STYLE,
    payload:styleObj
  }
}


export function triggerUserImages(allPictures,userID){
  const userImages = allPictures.filter(elem => {
    return userID === elem.userID
  })
  return {
    type:ALL_PICTURES,
    payload:userImages
  }
}
