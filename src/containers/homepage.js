import React, { Component } from 'react';
import Pictures from '../components/pictures';
import AvatarForm from  '../components/change_avatar_form';
import AddPictureForm from  '../components/add_picture_form';
import {connect} from 'react-redux';
import * as actions from '../actions';


 class Homepage extends Component {

   componentWillMount(){
    const {getAllPictures} = this.props;

    getAllPictures();
   }

  render() {
    const {allPictures} = this.props;



    return (
      <div id="homepage">
      <AvatarForm avatarFormSlide={this.props.avatarFormSlide}
                  avatarFormSlider={this.props.avatarFormSlider}
                  hideBrokenAvatarImg={this.props.hideBrokenAvatarImg}
                  userAvatar={this.props.userAvatar}/>
      <AddPictureForm pictureFormSlide={this.props.pictureFormSlide}
                      pictureFormSlider={this.props.pictureFormSlider}
                      addPicture={this.props.addPicture}/>

      <Pictures allPictures={this.props.allPictures}
                getAllPictures={this.props.getAllPictures}
                authenticated={this.props.authenticated}
                voted={this.props.voted}
                voteOnImage={this.props.voteOnImage}
                hideBrokenAvatarImg={this.props.hideBrokenAvatarImg}
                hideBrokenAvatar={this.props.hideBrokenAvatar}
                hideBrokenImage={this.props.hideBrokenImage}
                removeBrokenImage={this.props.removeBrokenImage}
                deleteImage={this.props.deleteImage}
                hoverMessage={this.props.hoverMessage}
                triggerHoverMessage={this.props.triggerHoverMessage}
                hoverBoxStyle={this.props.hoverBoxStyle}
                triggerHoverBoxStyle={this.props.triggerHoverBoxStyle}
                triggerUserImages={this.props.triggerUserImages}
                stopLoader={this.props.stopLoader}
                loaded={this.props.loaded}
                />
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    allPictures:state.data.allPictures,
    avatarFormSlide:state.style.avatarFormSlide,
    pictureFormSlide:state.style.pictureFormSlide,
    authenticated:state.auth.authenticated,
    voted:state.data.voted,
    hideBrokenAvatar:state.style.hideBrokenAvatar,
    hideBrokenImage:state.style.hideBrokenImage,
    hoverMessage:state.style.hoverMessage,
    hoverBoxStyle:state.style.hoverBoxStyle,
    loaded:state.style.loaded
  }
}

export default connect(mapStateToProps, actions)(Homepage)
