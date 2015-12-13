import '../css/master.scss';
//import FavoritesTable from './FavoritesTable.jsx';
import TransitBrowse from './TransitBrowse';
import TransitMap from './TransitMap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import Navbar from './Navbar.jsx';
import CorvallisBusClient from './CorvallisBusClient';

var sharedClient = new CorvallisBusClient();

var transitMap = new TransitMap(document.getElementById('map'), sharedClient.getStaticData());

ReactDOM.render(
  <TransitBrowse client={sharedClient} />,
  document.getElementById('stop-details'));
