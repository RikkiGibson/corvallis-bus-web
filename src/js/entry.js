import '../css/master.scss';
import FavoritesTable from './FavoritesTable';
import TransitBrowse from './TransitBrowse';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Navbar from './Navbar';
import icon from '../img/corvallisbus-icon.png';


ReactDOM.render(
	<Router>
		<Route path="/" component={Navbar}>
			<Route path="favorites" component={FavoritesTable}></Route>
			<Route path="browse" component={TransitBrowse}></Route>
		</Route>
	</Router>,
	document.getElementById('main'));
