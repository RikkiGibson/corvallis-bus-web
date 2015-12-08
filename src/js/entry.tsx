import '../css/master.scss';
//import FavoritesTable from './FavoritesTable.jsx';
import TransitBrowse from './TransitBrowse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import Navbar from './Navbar.jsx';
import CorvallisBusClient from './CorvallisBusClient';

var sharedClient = new CorvallisBusClient();

ReactDOM.render(
  <div>
    <span>derppp</span>
    <TransitBrowse client={sharedClient} />
  </div>,
  document.getElementById('main'));
