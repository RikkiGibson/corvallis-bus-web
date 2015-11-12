import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap, Marker } from "react-google-maps";
import CorvallisBusClient from './CorvallisBusClient';

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class TransitMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Stops: {},
      Routes: {}
    };
  }

  componentDidMount() {
    this.getStaticData();
  }

  getStaticData() {
    CorvallisBusClient
      .getStaticData()
      .then(staticData => {
        console.log(staticData);
        this.setState(staticData)
      });
  }

  render() {
    return (
      <div>
        <GoogleMap containerProps={{
            ...this.props,
            style: {
              height: "800px",
            },
          }}
          defaultZoom={12}
          defaultCenter={{lat: 44.56802, lng: -123.27926}}>

          {
            Object.keys(this.state.Stops).map(key => {
              var stop = this.state.Stops[key];
              return <Marker {...stop}
                position={{lat: stop.Lat, lng: stop.Long}}/>
            })
          }

          </GoogleMap>

          <table>
            <tbody>
              <tr>
                <td>Lol</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
