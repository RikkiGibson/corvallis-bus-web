import React from 'react';
import ReactDOM from 'react-dom';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';

export default class TransitBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Routes: {},
      Stops: {},
      SelectedStopDetails: { Routes: [] },
      SelectedStopArrivals: {}
    };
  }

  componentDidMount() {
    this.props.client
      .getStaticData()
      .then(staticData => {
        this.setState(staticData);
      });
  }

  setSelectedStop(stop) {
    stop.Routes = stop.RouteNames.map(routeName => this.state.Routes[routeName])
                                 .filter(route => route !== undefined);
    this.setState({
      SelectedStopDetails: stop,
      SelectedStopArrivals: {}
    });

    this.props.client
      .getSchedule(stop.ID)
      .then(schedule => {
        this.setState({
          SelectedStopArrivals: schedule
        });
      });
  }

  render() {
    return (
      <div className="browse">
        <StopDetailsTable SelectedStopDetails={this.state.SelectedStopDetails}
                          SelectedStopArrivals={this.state.SelectedStopArrivals} />
        <TransitMap Stops={this.state.Stops} setSelectedStop={stop => this.setSelectedStop(stop)} />
      </div>
    );
  }
}
