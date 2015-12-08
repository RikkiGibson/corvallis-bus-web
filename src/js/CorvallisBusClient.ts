const ROOT_URL = "https://corvallisb.us/api"

export default class CorvallisBusClient {
  staticDataPromise: Promise<any>;
  
  // TODO: should the code for favorites be deleted or left in,
  // considering I'm not planning to support favorites in the web version?
  getFavoriteStops() {
    var makeURL = function(position) {
      var favoritesJSON = window.localStorage["favoriteStops"];
      var stopIDs = favoritesJSON
      ? JSON.parse(favoritesJSON)
      : [];
  
      var url = ROOT_URL + "/favorites?stops=" + stopIDs.join(',') + "&location=";
      if (position) {
        url += position.coords.latitude + "," + position.coords.longitude;
      }
      return url;
    }

    var promise = new Promise(getUserLocation)
      .then(position => new Promise(makeRequest("GET", makeURL(position))),
        error => new Promise(makeRequest("GET", makeURL(null))))
      .then((favoritesJSON: string) => JSON.parse(favoritesJSON));

    return promise;
  }

  getStaticData() {
    if (!this.staticDataPromise) {
      this.staticDataPromise = 
        new Promise(makeRequest("GET", ROOT_URL + "/static"))
          .then((staticDataJSON: string) => JSON.parse(staticDataJSON));
    }
    return this.staticDataPromise;
  }

  getArrivalsSummary(stopID) {
    var url = ROOT_URL + "/arrivals-summary/" + stopID.toString();
    return new Promise(makeRequest("GET", url))
      .then((scheduleJSON: string) => JSON.parse(scheduleJSON)[stopID])
  }
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

  return task;
}

export function getUserLocation(resolve, reject?) {
  if (!navigator.geolocation) {
    reject('User location not available');
  }
  navigator.geolocation.getCurrentPosition(
    position => resolve(position),
    error => reject(error));
}
