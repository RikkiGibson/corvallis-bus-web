import '../css/master.scss';
//import FavoritesTable from './FavoritesTable.jsx';
import TransitBrowse from './TransitBrowse.tsx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import Navbar from './Navbar.jsx';
import CorvallisBusClient from './CorvallisBusClient.ts';

var sharedClient = new CorvallisBusClient();

ReactDOM.render(
  <div>
    <TransitBrowse client={sharedClient} />
  </div>,
  document.getElementById('main'));
