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
                  <span className="route-name" style={firstRouteStyle}>
                    {route.RouteName}
                  </span>
                  <span>
                    {route.ArrivalsSummary}
                  </span>
                </td>
              </tr>
              
            })
          }
        </tbody>
      </table>
    );
  }
}
