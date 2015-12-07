import React from 'react';
import arrow from '../img/ListCurrentLoc.png';

export default class FavoritesRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var firstRouteStyle = {
      backgroundColor: this.props.FirstRouteName.length > 0
        ? "#" + this.props.FirstRouteColor
        : "gray"
    };
    var secondRouteStyle = {
      backgroundColor: this.props.SecondRouteName.length > 0
        ? "#" + this.props.SecondRouteColor
        : ""
    };

    var firstRouteName = this.props.FirstRouteName.length > 0
      ? this.props.FirstRouteName
      : "N/A";

    var arrowStyle = {
      display: this.props.IsNearestStop ? "" : "none"
    };

    return <tr className="favorite-row" onClick={this.props.onClick}>
      <td>
        <div>{this.props.StopName}</div>
        <div className="favorite-route">
          <span className="route-name" style={firstRouteStyle}>
            {firstRouteName}
          </span>
          {this.props.FirstRouteArrivals}
          <img src={arrow} className="location-arrow" style={arrowStyle}/>
        </div>

        <div className="favorite-route">
          <span className="route-name" style={secondRouteStyle}>
            {this.props.SecondRouteName}
          </span>
          {this.props.SecondRouteArrivals}
          <span className="distance">
            {this.props.DistanceFromUser}
          </span>
        </div>
      </td>
    </tr>
  }
}
