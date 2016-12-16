import React, {PropTypes, Component} from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';

class AvatarForm extends Component{

  handleAvatarSubmit(value){
    if(value.avatar.length > 0){
      this.props.avatarFormSlider(false);//hides form again
      this.props.hideBrokenAvatarImg(false);//displays image again
      this.props.userAvatar(value.avatar);//changes user avatar

      return value.avatar = '';
    }

  }

  slideFormUp(){
    this.props.avatarFormSlider(false);
  }

  render(){
    const {handleSubmit,avatarFormSlide} = this.props;
    const style = {top:avatarFormSlide};
     return(
      <div id="avatarFormContainer" style={style}>
      <div>avatar URL address:</div>
        <form autoComplete="off" id="avatarForm" onSubmit={handleSubmit(this.handleAvatarSubmit.bind(this))}>
          <Field name="avatar" className="formInput" placeholder="e.g http:/image.jpeg" type="text" component="input" />
            <button action="submit" className="formButtons">submit</button>
            <button onClick={this.slideFormUp.bind(this)} className="formButtons">cancel</button>
        </form>
      </div>
    )
}
}

function validate(values){
  const errors = {};

  if (!values.avatar){
    errors.avatar = 'Enter an avatar address';
  }
  return errors;
}

export default reduxForm({
  form:'avatarform',
  validate
})(AvatarForm)
