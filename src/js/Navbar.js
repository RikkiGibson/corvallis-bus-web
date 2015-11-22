import React from 'react';
import ReactDOM from 'react-dom';
import icon from '../img/corvallisbus-icon.png';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    var pathname = this.props.location.pathname;
    return (
      <div>
        <div className="nav-container">
          <div className="logo">
            <Link to="/"><img className="logo-image" src={icon} /></Link>
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
        </div>

        {this.props.children}
      </div>
    );
  }
}
