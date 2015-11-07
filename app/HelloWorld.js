var React = require('react');
var ajax = require('./ajax');


module.exports = class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
		this.state = {favoriteStops: 'I Exist!!!'}
	}

	componentDidMount() {
		var that = this;
		ajax.getFavoriteStops(this.props.favoriteStops, this.props.location).then(function(favorites) {
			that.setState({
				favoriteStops: favorites
			})
		});
	}

	render() {
		return (
		<div>
			<p>{this.state.favoriteStops}</p>	
		</div>
		);
	}
}
