import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Models.ts';

interface Props {
  selectedStop: BusStop;
  selectedStopArrivalsSummary: Array<RouteArrivalsSummary>;
}

interface State {
  
}

export default class StopDetailsTable extends React.Component<Props, State> {
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
            this.props.selectedStopArrivalsSummary.map(routeSummary => {

              var firstRouteStyle = {
                backgroundColor: routeSummary.routeName.length > 0
                  ? "#" + routeSummary.routeColor
                  : "gray"
              };
              return <tr key={routeSummary.routeName}>
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
              
            })
          }
        </tbody>
      </table>
    );
  }
}
