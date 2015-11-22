import '../css/master.scss';
import FavoritesTable from './FavoritesTable';
import TransitBrowse from './TransitBrowse';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Navbar from './Navbar';
import icon from '../img/corvallisbus-icon.png';
import CorvallisBusClient from './CorvallisBusClient';

var sharedClient = new CorvallisBusClient();

class WrappedFavoritesTable extends React.Component {
  render() {
    return <FavoritesTable client={sharedClient} />;
  }
}

class WrappedTransitBrowse extends React.Component {
  render() {
    return <TransitBrowse client={sharedClient} />;
  }
}

ReactDOM.render(
	<Router>
		<Route path="/" component={Navbar}>
			<Route path="favorites" component={WrappedFavoritesTable}></Route>
			<Route path="browse" component={WrappedTransitBrowse}></Route>
		</Route>
	</Router>,
	document.getElementById('main'));
