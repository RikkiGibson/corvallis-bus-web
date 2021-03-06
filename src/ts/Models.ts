interface BusStop {
    /** The 5-digit identifier posted on bus stop signs in Corvallis. */
    id: number;

    name: string;
    lat: number;
    lng: number;

    /** The names of routes that stop at this BusStop. */
    routeNames: string[];

    /** An angle in degrees indicating the travel direction of buses arriving at this stop. */
    bearing: number;
}

interface BusRoute {
    // TODO: should all instances of routeNo be changed to routeName for consistency?
    /** The name of the route, e.g. "3" or "NON". */
    routeNo: string;

    /** A list of the sequence of stop IDs visited by this BusRoute. */
    path: number[];

    color: string;
    url: string;
    polyline: string;
    googlePolyline?: google.maps.Polyline;
}

interface StaticData {
    routes: { [routeNo: string]: BusRoute; };
    stops: { [stopID: string]: BusStop; };
}

interface RouteArrivalsSummary {
    /** The name of the route, e.g. "3" or "NON". */
    routeName: string;

    /** A user-friendly description of upcoming arrival times. */
    arrivalsSummary: string;

    /** A user-friendly description of today's schedule for the route. */
    scheduleSummary: string;
}

interface RouteArrivalsViewModel {
    routeName: string;
    routeColor: string;
    routeURL: string;
    arrivalsSummary: string;
    scheduleSummary: string;
}