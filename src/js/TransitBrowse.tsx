import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';
import CorvallisBusClient from './CorvallisBusClient';
import './Models.ts';

interface Props {
  client: CorvallisBusClient;
}

interface State {
  routes?: { [routeName: string]: BusRoute };
  stops?: { [stopID: string]: BusStop };
  selectedStop?: BusStop;
  selectedStopArrivalsSummary?: Array<RouteArrivalsSummary>;
}

export default class TransitBrowse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      routes: {},
      stops: {},
      selectedStop: null,
      selectedStopArrivalsSummary: []
    };
  }

  componentDidMount() {
    this.props.client
      .getStaticData()
      .then(staticData => {
        console.log(staticData);
        this.setState(staticData);
      });
  }

  setSelectedStop(stop: BusStop) {
    this.setState({
      selectedStop: stop
    });

    var didCallBack = false;
    setTimeout(() => {
      if (!didCallBack) {
        this.setState({
          selectedStopArrivalsSummary: []
        });
      }
    }, 1000);
    
    this.props.client
      .getArrivalsSummary(stop.id)
      .then(summary => {
        didCallBack = true;
        this.setState({
          selectedStopArrivalsSummary: summary
        });
      });
  }

  render() {
    return (
      <div className="browse">
        <StopDetailsTable selectedStop={this.state.selectedStop}
                          selectedStopArrivalsSummary={this.state.selectedStopArrivalsSummary} />
        <TransitMap stops={this.state.stops} setSelectedStop={stop => this.setSelectedStop(stop)} />
      </div>
    );
  }
}
