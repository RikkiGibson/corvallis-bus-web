// Import CSS
import '../css/master.scss';
import FavoritesTable from './FavoritesTable';

// Import React and JS
import HelloBox from './HelloBox';
import React from 'react';

// todo: put this in component logic instead of top level so it gets called more than once
// how to do mocking/substitution?
// test values which can be hardcoded as needed:
// <FavoritesTable favoriteStops={[11776,10308]} location={{lat:44.5645659, lng: -123.2620435}} />,

window.localStorage.setItem("favoriteStops", JSON.stringify([11776,10308,13220]));
var favoriteStops = JSON.parse(window.localStorage.favoriteStops);

var renderApp = function(latLng) {
	// Render!
	React.render(
		<FavoritesTable favoriteStops={favoriteStops} location={latLng} />,
		document.getElementsByTagName('body')[0]
	);
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(position => {
		var latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
		renderApp(latLng);
	}, error => {
		renderApp();
	})
}
