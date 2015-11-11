import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap } from "react-google-maps";

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class TransitMap extends React.Component {
	render () {
    return (
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        defaultZoom={8}
        defaultCenter={{lat: -34.397, lng: 150.644}} />
    );
  }
}
