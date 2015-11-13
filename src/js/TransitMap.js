import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap, Marker } from "react-google-maps";
import CorvallisBusClient from './CorvallisBusClient';

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
          defaultCenter={{lat: 44.56802, lng: -123.27926}}>

          {

            Object.keys(this.props.Stops).map(key => {
              var stop = this.props.Stops[key];
              var clickHandler = () => { this.props.setSelectedStop(stop); console.log(stop); }
              return <Marker key={stop.ID} position={{lat: stop.Lat, lng: stop.Long}} onClick={clickHandler}/>
            })

          }

        </GoogleMap>
      </div>
    );
  }
}
