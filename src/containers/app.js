import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from '../components/header';
import Footer from '../components/footer';
import config from '../../config';

 class App extends Component {
  componentWillMount(){

    const options = {
      allowedConnections: ['twitter', 'facebook'],
      auth: {
         redirectUrl: 'http://localhost:8080',
         responseType: 'token'
    }
    }
    const lock = new Auth0Lock(
      config.auth0_id,
      config.auth0_domain,
      options
    );
    this.lock = lock;

    lock.on("authenticated", function(authResults){

      lock.getProfile(authResults.idToken, function(err, profile){
        if(err){
          console.error('there was an error authenticating user',err);
          throw err;
        }
          this.props.authLogin(profile.user_id,profile.name,profile.identities[0].provider)

      }.bind(this));
    }.bind(this));

this.props.authLock(this.lock);
  }

  render() {
    const childrenWithProps = React.cloneElement(this.props.children, this.props);

    return (
      <div id="app">
        <div className="page-wrap">
        <Header authenticated={this.props.authenticated}
                lock={this.props.lock}
                logout={this.props.logout}
                avatarFormSlider={this.props.avatarFormSlider}
                pictureFormSlider={this.props.pictureFormSlider}
                getAllPictures={this.props.getAllPictures}/>
          {childrenWithProps}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    authenticated:state.auth.authenticated,
    lock:state.auth.lock
  }
}

export default connect(mapStateToProps, actions)(App);
