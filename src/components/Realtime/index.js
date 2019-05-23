import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import firebase from '../../Firebase'

import './style.css';
const style = {
  width: '100%',
  height: '80%'
}
const mapStyle = {
  flex: 0
}

class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      hwId: '',
      userId: '',
      groupId: '',
      displayName: '',
      displayImg: '',
      isLoading: false,
      isDisplayMap: false,
      satellites: 0,
      speed: 0,
      altitude: 0
    }
  }

  async componentDidMount() {

    await global.liff.init(
      async (data) => {
        await global.liff.getProfile().then(async profile => {

          this.setState({ displayName: profile.displayName });
          this.setState({ displayImg: profile.pictureUrl });

          




        });

        this.setState({
          userId: data.context.userId,
          groupId: data.context.groupId,
        })
      });

    if (!this.state.userId) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });

      const queryList = db.collection("tracker").where('uid', '==', this.state.userId);
      const getData = queryList.get();

      getData.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data().hw);
          //const hwId = doc.data().hw;
          this.setState({ hwId: doc.data().hw });
        });
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });

      this.setState({
        isLoading: true
      });
    }

    
    const locationRef = firebase.database().ref('/currentLocation/' + this.state.hwId);
    locationRef.on('value', (snapshot) => {
      let locationData = snapshot.val();
      for (let item in locationData) {
        let satellites = locationData[item].satellites;
        let altitude = locationData[item].altitude;
        let speed = locationData[item].speed;
        let longtitude = locationData[item].longtitude;
        let latitude = locationData[item].latitude;
        //alert(latitude);
        if (this.state.userId !== "") {
          this.setState({
            currentLatLng: {
              lat: latitude,
              lng: longtitude
            },
            satellites: satellites,
            altitude: altitude,
            speed: speed,
            isDisplayMap: true
          })
        }
      }
    });
    



    if (!this.state.userId) {
      console.log("no user data");
      this.getGeoLocation();
    }


  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isDisplayMap: true
          }));
        }
      );
    } else {
      //console.log(error)
    }
  }

  render() {
    if (this.state.isDisplayMap) {
      let currentLocation = "";
      if (this.state.userId !== "") {
        currentLocation = <Marker
          name={'Current location'}
          position={this.state.currentLatLng}
          icon={{
            url: 'https://firebasestorage.googleapis.com/v0/b/iot-project-239110.appspot.com/o/car.png?alt=media&token=4f4923b9-906e-499c-a271-5bae3f47fa91',
            size: { width: 35, height: 35 },
            anchor: { x: 15, y: 50 },
            scaledSize: { width: 35, height: 35 }
          }}
        />
      }



      return (
        <div>
          <div style={mapStyle}>
            <Map
              google={this.props.google}
              style={style}
              defaultCenter={this.state.currentLatLng}
              initialCenter={this.state.currentLatLng}
              zoom={16}
              onClick={this.onMapClicked}
            >
              {currentLocation}
            </Map>
          </div>

          <div className='consoleNav'>
            <div className='column'>
              <div className="title">Satellites</div>
              <div className="value">{this.state.satellites}</div>
            </div>
            <div className='column'>
              <div className="title">Speed</div>
              <div className="value">{this.state.speed} Km/h</div>
            </div>
            <div className='column'>
              <div className="title">Altitude</div>
              <div className="value">{this.state.altitude}m.</div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }

  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyByXl0CVZ7VkRclVRJviFTzAKZe-f6V1ww'
})(Realtime);