import React from 'react';
import ReactDOM from 'react-dom';
import CorvallisBusIcon from '../img/corvallisbus-icon.png';
import AppStoreIcon from '../img/app-store-icon.png';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="nav-container">
        <div className="logo">
          <img className="logo-image" src={CorvallisBusIcon} />
        </div>
        <div className="nav">
          <a href="http://www.corvallisoregon.gov/index.aspx?page=1105" target="_blank">
            Service Alerts
          </a>
        </div>
        <div className="end">
          <a href="https://itunes.apple.com/us/app/corvallis-bus/id936262664?mt=8#">
            <img className="app-store-logo" src={AppStoreIcon} />
          </a>
        </div>
      </div>
    );
  }
}
