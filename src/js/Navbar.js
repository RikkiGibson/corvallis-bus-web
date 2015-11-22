import React from 'react';
import ReactDOM from 'react-dom';
import CorvallisBusIcon from '../img/corvallisbus-icon.png';
import AppStoreIcon from '../img/app-store-icon.png';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    var pathname = this.props.location.pathname;
    return (
      <div>
        <div className="nav-container">
          <div className="logo">
            <Link to="/"><img className="logo-image" src={CorvallisBusIcon} /></Link>
          </div>
          <div className="nav">
            <Link className={pathname.includes("favorites") ? "nav active" : "nav"} to="favorites">
              Favorites
            </Link>
          </div>
          <div className="nav">
            <Link className={pathname.includes("browse") ? "nav active" : "nav"} to="browse">
              Browse
            </Link>
          </div>
          <div className="nav">
            <a href="http://www.corvallisoregon.gov/index.aspx?page=1105" target="_blank">
              Service Alerts
            </a>
          </div>
          {/*<div className="end">
            <a href="https://itunes.apple.com/us/app/corvallis-bus/id936262664?mt=8#">
              <img className="app-store-logo" src={AppStoreIcon} />
            </a>
          </div>*/}
        </div>

        {this.props.children}

        <div className="footer">
          <span className="author-contact"><a href="https://rikkigibson.github.io">Contact the author</a></span>
        </div>
      </div>
    );
  }
}
