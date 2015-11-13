import React from 'react';
import ReactDOM from 'react-dom';

export default class StopDetailsTable extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>{this.props.SelectedStopDetails.Name}</td>
          </tr>
          {
            this.props.SelectedStopDetails.Routes.map(route => 
              <tr><td>{route.RouteNo}</td></tr>)
          }
        </tbody>
      </table>
    );
  }
}
