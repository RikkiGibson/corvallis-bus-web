import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GoogleMap, Marker } from "react-google-maps";
import { getUserLocation } from "./CorvallisBusClient";


// Tell TypeScript that the require function exists so it stops complaining.
// This is how to include images using webpack.
declare var require: (string) => any;
var userLocationImage = require("../img/user-location.png");

interface Props {
  Stops: any;
  setSelectedStop: any;
}

interface State {
  center?: google.maps.LatLngLiteral;
  userLocation?: google.maps.LatLngLiteral;
}

export default class TransitMap extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: 44.56802, lng: -123.27926 },
      userLocation: null
    };
  }
  
  onGetUserLocationClicked() {
    getUserLocation(location => { 
        var latLng = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
        this.setState({
          center: latLng,
          userLocation: latLng
        });
    });
  }
  
  render() {
    const userLocationImageData = {
      url: userLocationImage,
      size: new google.maps.Size(66, 66),
      scaledSize: new google.maps.Size(22, 22),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(11, 11)
    };
    
    return (
      <div className="map-container">
        <GoogleMap containerProps={{
            /*...this.props,*/
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
            }).concat(this.state.userLocation
              ? [<Marker key={"userLocation"} position={this.state.userLocation} icon={userLocationImageData} />]
              : [])
          }
        </GoogleMap>
        <a className="location-button clickable" onClick={() => this.onGetUserLocationClicked()}>
        </a>
      </div>
    );
  }
}
