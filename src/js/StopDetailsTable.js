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
            this.props.SelectedStopDetails.Routes.map(route => {
              var schedule = ((this.props.SelectedStopArrivals[stopID] || {})[route.RouteNo] || []).join(", ");
              var firstRouteStyle = {
                backgroundColor: route.RouteNo.length > 0
                  ? "#" + route.Color
                  : "gray"
              };
              return <tr key={route.RouteNo}>
                <td>
                  <span className="route-name" style={firstRouteStyle}>
                    {route.RouteNo}
                  </span>
                  <span>
                    {schedule}
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
