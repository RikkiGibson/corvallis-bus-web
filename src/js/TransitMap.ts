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

const USER_LOCATION_ICON: google.maps.Icon = {
  url: userLocationImage,
  size: new google.maps.Size(66, 66),
  scaledSize: new google.maps.Size(22, 22),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(11, 11)
};

const BUS_STOP_SELECTED_ICON: google.maps.Icon = {
  url: require("../img/greenoval-highlighted.png"),
  size: new google.maps.Size(96, 117),
  scaledSize: new google.maps.Size(45, 55),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(22.5, 55),
};

export default class TransitMap {
  private map: google.maps.Map;
  private stopMarkers: { [stopID: number]: google.maps.Marker } = {};
  private selectedMarker: google.maps.Marker;
  private userLocation: google.maps.Marker;
  
  constructor(mapDiv: HTMLElement, userLocationButton: HTMLElement,
              private staticDataPromise: Promise<StaticData>,
              private setSelectedStop: (BusStop) => void) {
    this.map = new google.maps.Map(mapDiv, {
      center: new google.maps.LatLng(44.56802, -123.27926),
      zoom: 15
    });
    
    userLocationButton.onclick = () => this.onClickUserLocation();
    
    staticDataPromise.then(staticData => {
      for (var key in staticData.stops) {
        this.stopMarkers[key] = this.makeMapMarker(staticData.stops[key]);
      }
    });
  }
  
  makeMapMarker(stop: BusStop): google.maps.Marker {
    var marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(stop.lat, stop.lng),
      icon: BUS_STOP_ICON
    });
    
    marker.addListener('click', () => this.onClickMapMarker(marker, stop));
    
    return marker;
  }
  
  onClickMapMarker(marker: google.maps.Marker, stop: BusStop) {
    this.setSelectedStop(stop);
    
    if (this.selectedMarker) {
      this.selectedMarker.setIcon(BUS_STOP_ICON);
    }
    marker.setIcon(BUS_STOP_SELECTED_ICON);
    this.selectedMarker = marker;
  }
  
  onClickUserLocation() {
    getUserLocation(location => {
      var latLng = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      this.map.panTo(latLng);
      if (this.userLocation) {
        this.userLocation.setPosition(latLng);
      } else {
        var coords = location.coords;
        this.userLocation = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(coords.latitude, coords.longitude),
          icon: USER_LOCATION_ICON
        });
      }
    });
  }
}
