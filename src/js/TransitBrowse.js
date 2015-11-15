import React from 'react';
import ReactDOM from 'react-dom';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';
import CorvallisBusClient from './CorvallisBusClient';

export default class TransitBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Routes: {},
      Stops: {},
      SelectedStopDetails: { Routes: [] }
    };
  }

  componentDidMount() {
    CorvallisBusClient
      .getStaticData()
      .then(staticData => {
        this.setState(staticData);
      });
  }

  setSelectedStop(stop) {
    stop.Routes = stop.RouteNames.map(routeName => this.state.Routes[routeName]);
    this.setState({
      SelectedStopDetails: stop
    });
  }

  render() {
    return (
      <div className="browse">
        <StopDetailsTable SelectedStopDetails={this.state.SelectedStopDetails} />
        <TransitMap Stops={this.state.Stops} setSelectedStop={stop => this.setSelectedStop(stop)} />
      </div>
    );
  }
}
