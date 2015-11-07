import React from 'react';

export default class FavoritesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <tr>
			<td>
				{this.props.StopName}<br />
				{this.props.FirstRouteName} {this.props.FirstRouteArrivals}<br />
				{this.props.SecondRouteName} {this.props.SecondRouteArrivals} {this.props.DistanceFromUser}
			</td>
		</tr>
	}
}
