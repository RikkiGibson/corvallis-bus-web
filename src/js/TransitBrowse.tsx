import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitMap from './TransitMap.tsx';
import StopDetailsTable from './StopDetailsTable.tsx';
import CorvallisBusClient from './CorvallisBusClient.ts';

interface Props {
  client: CorvallisBusClient;
}

interface State {
  Routes?: Object;
  Stops?: Object;
  SelectedStopDetails?: Object;
  SelectedStopArrivals?: Array<any>;
}

export default class TransitBrowse extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      Routes: {},
      Stops: {},
      SelectedStopDetails: { Routes: [] },
      SelectedStopArrivals: []
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
      SelectedStopDetails: stop
    });

    var didCallBack = false;
    setTimeout(() => {
      if (!didCallBack) {
        this.setState({
          SelectedStopArrivals: []
        });
      }
    }, 1000);
    
    this.props.client
      .getArrivalsSummary(stop.ID)
      .then(summary => {
        didCallBack = true;
        this.setState({
          SelectedStopArrivals: summary
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
