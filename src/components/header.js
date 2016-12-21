import React, {Component} from 'react';

class Header extends Component{

showLock(){
    this.props.lock.show();
}

changeUserAvatar(){
  this.props.pictureFormSlider(false);
  this.props.avatarFormSlider(true);
}

addNewPicture(){
  this.props.avatarFormSlider(false);
  this.props.pictureFormSlider(true);
}

showAllPictures(){
  this.props.getAllPictures();
}

isUserAuthenticated(){
  const {authenticated} = this.props;

  if(authenticated){
    return(
      [<div key="headerButton2" onClick={this.props.logout} className="rightHeaderButtons">sign out</div>,
        <div key="headerButton1" onClick={this.addNewPicture.bind(this)} className="rightHeaderButtons">add picture</div>,
      <div key="headerButton3" onClick={this.changeUserAvatar.bind(this)} className="rightHeaderButtons">change avatar</div>,
      <div key="headerButton4" onClick={this.showAllPictures.bind(this)} className="leftHeaderButton">all pictures</div>]
    )
  }
  else{
    return [<div key="headerButton5" onClick={this.showLock.bind(this)} className="rightHeaderButtons">login</div>,
            <div key="headerButton4" onClick={this.showAllPictures.bind(this)} className="leftHeaderButton">all pictures</div>]
  }
}

  render(){
    return(
      <div id="header">
      {this.isUserAuthenticated()}
      </div>
    )
  }
}

export default Header;
