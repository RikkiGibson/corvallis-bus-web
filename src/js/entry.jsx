import '../css/master.scss';
import FavoritesTable from './FavoritesTable.jsx';
import TransitBrowse from './TransitBrowse.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx';
import icon from '../img/corvallisbus-icon.png';
import CorvallisBusClient from './CorvallisBusClient.jsx';

var sharedClient = new CorvallisBusClient();

ReactDOM.render(
  <div>
    <TransitBrowse client={sharedClient} />
  </div>,
  document.getElementById('main'));
