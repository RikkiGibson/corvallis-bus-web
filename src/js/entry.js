import '../css/master.scss';
import FavoritesTable from './FavoritesTable';
import TransitBrowse from './TransitBrowse';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

class Navbar extends React.Component {
	render() {
    var pathname = this.props.location.pathname;
		return (
			<ul className="nav">
				<li className="nav" id="favorites-link">
          <Link className={pathname.includes("favorites") ? "nav active" : "nav"} to="favorites">
            Favorites
          </Link>
        </li>
				<li className="nav" id="browse-link">
          <Link className={pathname.includes("browse") ? "nav active" : "nav"} to="browse">
            Browse
          </Link>
        </li>
				{this.props.children}
			</ul>
		);
	}
}

ReactDOM.render(
	<Router>
		<Route path="/" component={Navbar}>
			<Route path="favorites" component={FavoritesTable}></Route>
			<Route path="browse" component={TransitBrowse}></Route>
		</Route>
	</Router>,
	document.getElementById('main'));
