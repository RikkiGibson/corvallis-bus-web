var React = require('react');
var ajax = require('./ajax');

module.exports = class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div>
			<p>{this.props.favoriteStops[0]}</p>	
		</div>
		);
	}
}
