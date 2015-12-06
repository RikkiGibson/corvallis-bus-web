import React from 'react';
import ReactDOM from 'react-dom';

export default class StopDetailsTable extends React.Component {
  render() {
    var stopID = this.props.SelectedStopDetails.ID;

    return (
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
    );
  }
}
