var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = require('./HelloWorld');

var favs = [11776,10308];
var loc = {lat: 44.5645659, lng: -123.2620435};
ReactDOM.render(<HelloWorld favoriteStops={favs} location={loc}/>,
	document.getElementById('root')
);
