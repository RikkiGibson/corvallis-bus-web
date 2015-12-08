import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GoogleMap, Marker } from "react-google-maps";
import { getUserLocation } from "./CorvallisBusClient";
import './Models.ts';

// Tell TypeScript that the require function exists so it stops complaining.
// This is how to include images using webpack.
declare var require: (string) => any;
var userLocationImage = require("../img/user-location.png");

interface Props {
  stops: { [stopID: string]: BusStop };
  selectedStopID?: number;
  setSelectedStop: (BusStop) => void;
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
    const userLocationImageData: google.maps.Icon = {
      url: userLocationImage,
      size: new google.maps.Size(66, 66),
      scaledSize: new google.maps.Size(22, 22),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(11, 11)
    };
    
    const busStopImageData: google.maps.Icon = {
      url: require("../img/greenoval.png"),
      size: new google.maps.Size(96, 117),
      scaledSize: new google.maps.Size(37, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(18.5, 45)
    };
    
    const selectedStopImageData: google.maps.Icon = {
      url: require("../img/greenoval-highlighted.png"),
      size: new google.maps.Size(96, 117),
      scaledSize: new google.maps.Size(45, 55),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(22.5, 55),
    };
    return (
      <div className="map-container">
        <GoogleMap containerProps={{
            style: {
              height: "100%",
            },
          }}
          ref="map"
          defaultZoom={15}
          center={this.state.center}>
          {
            Object.keys(this.props.stops).map(key => {
              var stop = this.props.stops[key];
              var stopPosition = {
                lat: stop.lat,
                lng: stop.lng
              };
              var clickHandler = () => {
                this.setState({
                  center: stopPosition 
                });
                this.props.setSelectedStop(stop);
              }
              var isSelected = this.props.selectedStopID == stop.id;
              return <Marker key={key} position={stopPosition} onClick={clickHandler}
                             icon={isSelected ? selectedStopImageData : busStopImageData} zIndex={isSelected ? 2 : 1} />
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
