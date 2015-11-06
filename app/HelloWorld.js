var React = require('react');
var ajax = require('./ajax');

module.exports = class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
		this.state = {coolStuff:''};
	}
	componentDidMount() {
		var that = this;
		ajax(that.props.api, function (r) {
		  if (r.readyState != 4 || r.status != 200) return;
		  that.setState({coolStuff:r.responseText});
		});
	}
	render() {
		return (
		<div>
			<p>{this.state.coolStuff}</p>	
		</div>
		);
	}
}
