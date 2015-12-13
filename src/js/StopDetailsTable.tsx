import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Models.ts';

interface Props {
  selectedStop: BusStop;
  selectedStopArrivalsSummary: Array<RouteArrivalsSummary>;
  selectedRouteName: string;
  setSelectedRoute: (string) => void;
}

interface State {
  
}

export default class StopDetailsTable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: -1 };
  }
  
  onClickTableRow(index: number) {
    this.props.setSelectedRoute(this.props.selectedStopArrivalsSummary[index].routeName);
  }
  
  render() {
    var stopName = this.props.selectedStop
      ? this.props.selectedStop.name
      : "";
    
    return (
      <table className="stop-details">
        <tbody>
          <tr>
            <th className="stop-details-header">{stopName}</th>
          </tr>
          {
            this.props.selectedStopArrivalsSummary.map((routeSummary, index) => {

              var firstRouteStyle = {
                backgroundColor: routeSummary.routeName.length > 0
                  ? "#" + routeSummary.routeColor
                  : "gray"
              };
              
              var isSelected = routeSummary.routeName === this.props.selectedRouteName;
              
              return (
                <tr key={routeSummary.routeName}
                    className={isSelected ? "clickable-row selected" : "clickable-row"}
                    onClick={() => this.onClickTableRow(index)}>
                  <td>
                    <div className="route-name block">
                      <span className="" style={firstRouteStyle}>
                        {routeSummary.routeName}
                      </span>
                    </div>
                    <div className="block">
                      <div>
                        {routeSummary.arrivalsSummary}
                      </div>
                      <div>
                        <span className="schedule-summary">
                          {routeSummary.scheduleSummary}
                        </span>
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
