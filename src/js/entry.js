import '../css/master.scss';
import FavoritesTable from './FavoritesTable';
import TransitBrowse from './TransitBrowse';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

class Navbar extends React.Component {
	render() {
		return (
			<div>
				<div><Link to="/favorites">Favorites</Link></div>
				<div><Link to="/map">Map</Link></div>
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(
	<Router>
		<Route path="/" component={Navbar}>
			<Route path="favorites" component={FavoritesTable}></Route>
			<Route path="map" component={TransitBrowse}></Route>
		</Route>
	</Router>,
	document.getElementById('main'));
