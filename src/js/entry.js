// Import CSS
import '../css/master.scss';
import FavoritesTable from './FavoritesTable';

// Import React and JS
import HelloBox from './HelloBox';
import React from 'react';

// Render!
React.render(
	<FavoritesTable favoriteStops={[11776,10308]} location={{lat:44.5645659, lng: -123.2620435}} />,
	document.getElementsByTagName('body')[0]
);
