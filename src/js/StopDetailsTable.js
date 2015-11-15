import React from 'react';
import ReactDOM from 'react-dom';

export default class StopDetailsTable extends React.Component {
  render() {
    return (
      <table className="stop-details">
        <tbody>
          <tr>
            <th className="stop-details-header">{this.props.SelectedStopDetails.Name}</th>
          </tr>
          {
            this.props.SelectedStopDetails.Routes.map(route => {
              var firstRouteStyle = {
                backgroundColor: route.RouteNo.length > 0
                  ? "#" + route.Color
                  : "gray"
              };

              return <tr>
                <td>
                  <span className="route-name" style={firstRouteStyle}>
                    {route.RouteNo}
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
