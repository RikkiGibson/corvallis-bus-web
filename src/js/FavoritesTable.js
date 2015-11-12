import React from 'react';
import CorvallisBusClient from './CorvallisBusClient';
import FavoritesRow from './FavoritesRow';
import spinner from '../img/loading.gif'

export default class FavoritesTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favoriteStops: []
		};
	}

	update() {
		CorvallisBusClient
			.getFavoriteStops()
			.then(favorites => {
				this.setState({
					favoriteStops: favorites
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
			return <FavoritesRow key={row.StopId} {...row} onClick={clickHandler}/>
		});

		return (
			// todo: figure out why the new react won't let me put a header on the table
			<table className="table-favorites">
				<tbody className="favorites-body">
				{rows}
				</tbody>
			</table>
		);
	}
}
