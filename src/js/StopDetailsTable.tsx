import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  SelectedStopDetails: any;
  SelectedStopArrivals: Array<any>;
}

interface State {
  
}

export default class StopDetailsTable extends React.Component<Props, State> {
  render() {
    var stopID = this.props.SelectedStopDetails.ID;

    return (
      <div className="table-container">
        <table className="stop-details">
          <tbody>
            <tr>
              <th className="stop-details-header">{this.props.SelectedStopDetails.Name}</th>
            </tr>
            {
              this.props.SelectedStopArrivals.map(route => {
  
                var firstRouteStyle = {
                  backgroundColor: route.RouteName.length > 0
                    ? "#" + route.RouteColor
                    : "gray"
                };
                return <tr key={route.RouteName}>
                  <td>
                    <div className="route-name block">
                      <span className="" style={firstRouteStyle}>
                        {route.RouteName}
                      </span>
                    </div>
                    <div className="block">
                      <div>
                        {route.ArrivalsSummary}
                      </div>
                      <div>
                        <span className="schedule-summary">
                          {route.ScheduleSummary}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
