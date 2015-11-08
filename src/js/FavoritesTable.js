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

	update() {
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

	componentDidMount() {
		this.update();
		// You have to capture the current "this" in a lambda,
		// otherwise setInterval will call the function without the react component as "this"
		this.repeater = setInterval(() => this.update(), 30000);
	}

	componentWillUnmount() {
		clearInterval(this.repeater);
	}

	render() {
		var rows = this.state.favoriteStops.map(row => {
			var clickHandler = () => {
				alert("You clicked me: " + row.StopId);
			}
			return <FavoritesRow {...row} onClick={clickHandler}/>
		});

		return (
			<table className="table-favorites">
				<thead>
					<th>Favorites</th>
				</thead>
				<tbody className="favorites-body">
				{rows}
				</tbody>
			</table>
		);
	}
}
