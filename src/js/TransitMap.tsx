import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

const userLocationImageData: google.maps.Icon = {
  url: userLocationImage,
  size: new google.maps.Size(66, 66),
  scaledSize: new google.maps.Size(22, 22),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(11, 11)
};

const selectedStopImageData: google.maps.Icon = {
  url: require("../img/greenoval-highlighted.png"),
  size: new google.maps.Size(96, 117),
  scaledSize: new google.maps.Size(45, 55),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(22.5, 55),
};

export default class TransitMap {
  private map: google.maps.Map;
  private stopMarkers: { [stopID: number]: google.maps.Marker } = {};
  private userLocation: google.maps.Marker;
  
  constructor(mapDiv: HTMLElement, staticDataPromise: Promise<StaticData>) {
    this.map = new google.maps.Map(mapDiv, {
      center: new google.maps.LatLng(44.56802, -123.27926),
      zoom: 15
    });
    
    staticDataPromise.then(staticData => {
      for (var key in staticData.stops) {
        this.stopMarkers[key] = this.makeMapMarker(staticData.stops[key]);
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
  
  onClickUserLocation() {
    getUserLocation(location => {
      if (this.userLocation) {
        this.userLocation.setPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      } else {
        var coords = location.coords;
        this.userLocation = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(coords.latitude, coords.longitude)
        });
      }
    });
  }
}
