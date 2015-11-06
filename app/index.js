var React = require('react');
var ReactDOM = require('react-dom');

const API_PATH = "http://rikkib.us/favorites?stops=11776,10308&location=44.5645659,-123.2620435";

var HelloWorld = require('./HelloWorld');


ReactDOM.render(<HelloWorld api={API_PATH}/>,
	document.getElementById('example')
);

ReactDOM.render(<h1>{"I'm cool!"}</h1>,
	document.getElementById('foo')
);

