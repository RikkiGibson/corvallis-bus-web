const TEST_DATA = '[{"StopName":"Downtown Transit Center","StopId":14237,"DistanceFromUser":"0.1 miles","IsNearestStop":true,"FirstRouteColor":"034DA1","FirstRouteName":"6","FirstRouteArrivals":"13 minutes, 12:14 PM","SecondRouteColor":"","SecondRouteName":"","SecondRouteArrivals":""},{"StopName":"NW Monroe Ave & NW 7th St","StopId":10308,"DistanceFromUser":"0.2 miles","IsNearestStop":false,"FirstRouteColor":"BD559F","FirstRouteName":"5","FirstRouteArrivals":"9 minutes, 12:08 PM","SecondRouteColor":"008540","SecondRouteName":"8","SecondRouteArrivals":"10 minutes, 12:38 PM"},{"StopName":"SW Western Blvd & SW Hillside Dr","StopId":11776,"DistanceFromUser":"1.7 miles","IsNearestStop":false,"FirstRouteColor":"F26521","FirstRouteName":"3","FirstRouteArrivals":"26 minutes, 12:57 PM","SecondRouteColor":"EC0C6D","SecondRouteName":"C3","SecondRouteArrivals":"3:18 PM, 5:33 PM"}]';
const ROOT_URL = "https://corvallisb.us/api"

// TODO: render the schedule summary on the server side
var makeTestSchedule = stop => {
  var result = {};
  result[stop.ID] = {};
  for (var i = 0; i < stop.RouteNames.length-1; i++) {
    result[stop.ID][stop.RouteNames[i]] = [10, 70, 130, 190];
  }
  return result;
};

export default class CorvallisBusClient {
  getFavoriteStops() {
    var makeURL = function(position) {
    var favoritesJSON = window.localStorage.favoriteStops;
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
      .then(favoritesJSON => JSON.parse(TEST_DATA));

    return promise;
  }

  getStaticData() {
    if (!this.staticDataPromise) {
    this.staticDataPromise = 
      new Promise(makeRequest("GET", ROOT_URL + "/static"))
      .then(staticDataJSON => JSON.parse(staticDataJSON));
    }
    return this.staticDataPromise;
  }

  getArrivalsSummary(stopID) {
    var url = ROOT_URL + "/arrivals-summary/" + stopID.toString();
    return new Promise(makeRequest("GET", url))
      .then(scheduleJSON => JSON.parse(scheduleJSON)[stopID])
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

export function getUserLocation(resolve, reject) {
  if (!navigator.geolocation) {
    reject('User location not available');
  }
  navigator.geolocation.getCurrentPosition(
    position => resolve(position),
    error => reject(error));
}