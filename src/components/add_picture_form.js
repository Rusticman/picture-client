import React, {PropTypes, Component} from 'react';
import {reduxForm, Field} from 'redux-form';

class AddPictureForm extends Component{

  handlePictureSubmit(value){
    if(value.imageName.length > 0 && value.imageURL.length > 0){
        this.props.addPicture(value.imageName, value.imageURL);
        this.props.pictureFormSlider(false);

        value.imageName = '';
        value.imageURL = '';
      }


  }

  slideFormUp(e){
    e.preventDefault();
    this.props.pictureFormSlider(false);
  }

  render(){
    const {handleSubmit,pictureFormSlide} = this.props;
    const style = {top:pictureFormSlide};
     return(
      <div id="pictureFormContainer" style={style}>
      <div>new image URL address:</div>
        <form autoComplete="off" onSubmit={handleSubmit(this.handlePictureSubmit.bind(this))}>
          <label>URL:</label><Field name="imageURL" className="formInput" placeholder="e.g http:/image.jpeg" type="text" component="input" />
          <label>name:</label><Field name="imageName" className="formInput" type="text" component="input" />
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
  form:'pictureform',
  validate
})(AddPictureForm)
