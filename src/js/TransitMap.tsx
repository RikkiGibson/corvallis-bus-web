import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GoogleMap, Marker } from "react-google-maps";
import { getUserLocation } from "./CorvallisBusClient";
import './Models.ts';

// Tell TypeScript that the require function exists so it stops complaining.
// This is how to include images using webpack.
declare var require: (string) => any;
var userLocationImage = require("../img/user-location.png");

const BUS_STOP_ICON: google.maps.Icon = {
  url: require("../img/greenoval.png"),
  size: new google.maps.Size(96, 117),
  scaledSize: new google.maps.Size(37, 45),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(18.5, 45)
};

export default class TransitMap {
  private map: google.maps.Map;
  public markers: { [stopID: number]: google.maps.Marker } = {};
  
  constructor(mapDiv: HTMLElement, staticDataPromise: Promise<StaticData>) {
    this.map = new google.maps.Map(mapDiv, {
      center: new google.maps.LatLng(44.56802, -123.27926),
      zoom: 15
    });
    
    staticDataPromise.then(staticData => {
      for (var key in staticData.stops) {
        this.markers[key] = this.makeMapMarker(staticData.stops[key]);
      }
    });
  }
  
  makeMapMarker(stop: BusStop) {
    return new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(stop.lat, stop.lng),
      icon: BUS_STOP_ICON
    });
  }
  
  onGetUserLocationClicked() {
    // getUserLocation(location => { 
    //     var latLng = {
    //       lat: location.coords.latitude,
    //       lng: location.coords.longitude
    //     };
    //     this.setState({
    //       center: latLng,
    //       userLocation: latLng
    //     });
    // });
  }
  
  // render() {
  //   const userLocationImageData: google.maps.Icon = {
  //     url: userLocationImage,
  //     size: new google.maps.Size(66, 66),
  //     scaledSize: new google.maps.Size(22, 22),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(11, 11)
  //   };
    
  //   const selectedStopImageData: google.maps.Icon = {
  //     url: require("../img/greenoval-highlighted.png"),
  //     size: new google.maps.Size(96, 117),
  //     scaledSize: new google.maps.Size(45, 55),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(22.5, 55),
  //   };
  // }
}
