import '../css/master.scss';
import TransitBrowse from './TransitBrowse';
import TransitMap from './TransitMap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CorvallisBusClient from './CorvallisBusClient';
import 'es5-shim';

declare var require: (string) => any;
require('es6-promise').polyfill();

var sharedClient = new CorvallisBusClient();
var transitBrowse = new TransitBrowse(sharedClient,
  document.getElementById('stop-details'),
  document.getElementById('map'),
  document.getElementById('user-location-button'));
