import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap, Marker } from "react-google-maps";
import LocationIcon from "../img/location-icon.png";
import { getUserLocation } from "./CorvallisBusClient.jsx";

export default class TransitMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {lat: 44.56802, lng: -123.27926}
    };
  }
  
  onGetUserLocationClicked() {
    getUserLocation(location => { 
        this.setState({
          center: {
            lat: location.coords.latitude,
            lng: location.coords.longitude
          }
        });
    });
  }
  
  render() {
    return (
      <div className="map-container">
        <GoogleMap containerProps={{
            ...this.props,
            style: {
              height: "100%",
            },
          }}
          ref="map"
          defaultZoom={15}
          center={this.state.center}>
          {
            Object.keys(this.props.Stops).map(key => {
              var stop = this.props.Stops[key];
              var clickHandler = () => {
                this.setState({
                  center: {
                    lat: stop.Lat,
                    lng: stop.Long
                  }
                });
                this.props.setSelectedStop(stop);
              }
              return <Marker key={key} position={{lat: stop.Lat, lng: stop.Long}} onClick={clickHandler}/>
            })
          }

        </GoogleMap>
        <a className="location-button clickable" onClick={() => this.onGetUserLocationClicked()}>
        </a>
      </div>
    );
  }
}
