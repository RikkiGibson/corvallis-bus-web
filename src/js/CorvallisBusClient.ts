// If running on the server, expect the API is running there too.
const ROOT_URL = window.location.host
  ? "/api"
  : "https://corvallisb.us/api";

export default class CorvallisBusClient {
  private staticDataPromise: Promise<StaticData>;

  getStaticData(): Promise<StaticData> {
    if (!this.staticDataPromise) {
      this.staticDataPromise = 
        new Promise(makeRequest("GET", ROOT_URL + "/static"))
          .then((staticDataJSON: string) => JSON.parse(staticDataJSON));
    }
    return this.staticDataPromise;
  }

  getArrivalsSummary(stopID): Promise<Array<RouteArrivalsSummary>> {
    var url = ROOT_URL + "/arrivals-summary/" + stopID.toString();
    return new Promise(makeRequest("GET", url))
      .then((scheduleJSON: string) => JSON.parse(scheduleJSON)[stopID])
  }
}

function makeRequest(method: string, url: string):
                    (resolve: (any) => void, reject: (any) => void) => void {
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

export function getUserLocation(resolve: PositionCallback, reject?: PositionErrorCallback): void {
  if (!navigator.geolocation) {
    var err = new PositionError();
    err.code = PositionError.POSITION_UNAVAILABLE;
    err.message = "User location not available";
    reject(err);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    position => resolve(position),
    error => reject(error));
}
