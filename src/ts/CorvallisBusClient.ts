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

    getArrivalsSummary(stopID): Promise<RouteArrivalsSummary[]> {
        var url = ROOT_URL + "/arrivals-summary/" + stopID.toString();
        return new Promise(makeRequest("GET", url))
            .then((scheduleJSON: string) => JSON.parse(scheduleJSON)[stopID])
    }
}

function makeRequest(method: string, url: string):
    (resolve: (any) => void, reject: (any) => void) => void {
    var task = function (resolve, reject) {
        var r = new XMLHttpRequest();
        r.open(method, url);
        r.onload = function (ev) {
            if (r.status >= 200 && r.status < 300) {
                resolve(r.response);
            } else {
                reject({
                    status: r.status,
                    statusText: r.statusText
                });
            }
        }
        r.send();
    };

    return task;
}

export function getUserLocation(resolve: PositionCallback, reject?: (err: any) => void): void {
    const rej = reject || console.error;
    if (!navigator.geolocation) {
        rej("User location not available");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => rej(error));
}
