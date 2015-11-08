module.exports = {
	getFavoriteStops: getFavoriteStops
}

function makeRequest(method, url) {
	var task = function(resolve, reject) {
		var r = new XMLHttpRequest();
		r.open(method, url);
		r.onload = function() {
			if (this.status >= 200 && this.status < 300) {
				resolve(r.response);
			} else {
				reject({
					status: this.status,
					statusText: r.statusText
				});
			}
		}
		r.send();
	};

	return new Promise(task);
}

function getFavoriteStops(stopIDs, latLng) {
	var url = "http://rikkib.us/favorites?stops=" + stopIDs.join(',') + "&location=";
	if (latLng) {
		url += latLng.lat + "," + latLng.lng;
	}
	return makeRequest("GET", url);
}
