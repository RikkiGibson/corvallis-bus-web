import React from 'react';
import CorvallisBusClient from './CorvallisBusClient';
import FavoritesRow from './FavoritesRow';

export default class FavoritesTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favoriteStops: []
		};
	}

	componentDidMount() {
		CorvallisBusClient
			.getFavoriteStops(this.props.favoriteStops, this.props.location)
			.then(favorites => {
				this.setState({
					favoriteStops: JSON.parse(favorites)
				})
			}).catch(err => {
				console.log(err);
			});
	}

	render() {
		var rows = this.state.favoriteStops.map(row => { return <FavoritesRow {...row}/> });

		return (
			<table>
				<tbody>
				{rows}
				</tbody>
			</table>
		);
	}
}
