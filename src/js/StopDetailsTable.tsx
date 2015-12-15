import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Models.ts';

declare var require: (string) => any;

interface Props {
  selectedStop: BusStop;
  selectedStopArrivalsViewModel: Array<RouteArrivalsViewModel>;
  selectedRouteName: string;
  setSelectedRoute: (string) => void;
}

interface State {
  
}

export default class StopDetailsTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  
  onClickTableRow(index: number) {
    this.props.setSelectedRoute(this.props.selectedStopArrivalsViewModel[index].routeName);
  }
  
  render() {
    var stopName = this.props.selectedStop
      ? this.props.selectedStop.name
      : "Select a bus stop to begin";
    
    return (
      <table className="stop-details">
        <tbody>
          <tr>
            <th className="stop-details-header">{stopName}</th>
          </tr>
          {
            this.props.selectedStopArrivalsViewModel.map((routeSummary, index) => {

              var firstRouteStyle = {
                backgroundColor: "#" + routeSummary.routeColor
              };
              
              var isSelected = routeSummary.routeName === this.props.selectedRouteName;
              
              return (
                <tr key={routeSummary.routeName}
                    className={isSelected ? "clickable-row selected" : "clickable-row"}
                    onClick={() => this.onClickTableRow(index)}>
                  <td>
                    <div className="route-details">
                      <div className="route-name flex-item">
                        <span style={firstRouteStyle}>
                          {routeSummary.routeName}
                        </span>
                      </div>
                      <div>
                        <div>
                          {routeSummary.arrivalsSummary}
                        </div>
                        <div className="schedule-summary">
                          {routeSummary.scheduleSummary}
                        </div>
                      </div>
                      <div className="flex-item end">
                        <a href={routeSummary.routeURL} target="_blank">
                          <img className="more-info" src={require("../img/idea.png")} />
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
