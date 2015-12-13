import '../css/master.scss';
import TransitBrowse from './TransitBrowse';
import TransitMap from './TransitMap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CorvallisBusClient from './CorvallisBusClient';

var sharedClient = new CorvallisBusClient();
var transitBrowse = new TransitBrowse(sharedClient,
  document.getElementById('stop-details'),
  document.getElementById('map'),
  document.getElementById('user-location-button'));
