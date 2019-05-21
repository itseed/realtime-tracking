import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import firebase from '../../Firebase'

import './style.css';
const style = {
  width: '100%',
  height: '100%'
}

class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      groupId: '',
      displayName: '',
      displayImg: '',
      isLoading: false
    }
  }

  async componentDidMount() {
    await global.liff.init(
      async (data) => {
        await global.liff.getProfile().then(async profile => {

          this.setState({ displayName: profile.displayName });
          this.setState({ displayImg: profile.pictureUrl });

          var users = sessionStorage.getItem('userId');

          if (!users) {
            sessionStorage.setItem('userId', data.context.userId);
            sessionStorage.setItem('groupId', data.context.groupId);
            sessionStorage.setItem('displayName', profile.displayName);
            sessionStorage.setItem('displayImg', profile.pictureUrl);
          }

          this.setState({
            displayName: profile.displayName,
            displayImg: profile.pictureUrl,
            isLoading: true
          })

        });

        this.setState({
          userId: data.context.userId,
          groupId: data.context.groupId,
        })
      });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}
        zoom={8}
        onClick={this.onMapClicked}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyByXl0CVZ7VkRclVRJviFTzAKZe-f6V1ww'
})(Realtime);