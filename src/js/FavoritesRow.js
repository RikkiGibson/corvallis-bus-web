import React from 'react';

export default class FavoritesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var firstRouteStyle = {
			backgroundColor: (this.props.FirstRouteName.length > 0) ? "#" + this.props.FirstRouteColor : "gray"
		};
		var secondRouteStyle = {
			backgroundColor: (this.props.SecondRouteName.length > 0) ? "#" + this.props.SecondRouteColor : ""
		};

		var firstRouteName = this.props.FirstRouteName.length > 0 ? this.props.FirstRouteName : "N/A";

		return <tr className="favorite-row" onClick={this.props.onClick}>
			<td>
				{this.props.StopName}<br />
				<div className="favorite-route">
					<span className="route-name" style={firstRouteStyle}>{firstRouteName}</span> {this.props.FirstRouteArrivals}
				</div>

				<div className="favorite-route">
				<span className="route-name" style={secondRouteStyle}>{this.props.SecondRouteName}</span> {this.props.SecondRouteArrivals} <span className="distance">{this.props.DistanceFromUser}</span>
				</div>
			</td>
		</tr>
	}
}
