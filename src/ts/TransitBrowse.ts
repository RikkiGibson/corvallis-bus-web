import * as ko from 'knockout';
import TransitMap from './TransitMap';
import CorvallisBusClient from './CorvallisBusClient';
import './Models.ts';

interface StopDetailsViewModel {
    selectedStop: KnockoutObservable<BusStop>;
    selectedStopArrivals: KnockoutObservable<Array<RouteArrivalsViewModel>>;
    selectedRouteName: KnockoutObservable<string>;
    errorMessage: KnockoutObservable<string>;
    setSelectedRoute: (string) => void;
}

/**
 * Wraps exception handling around local storage access.
 * Safari explodes when trying to use local storage with private browsing.
 */
function localStorageStopID(id?: number): string {
    try {
        if (id !== null && id !== undefined) {
            window.localStorage['selectedStopID'] = id;
            // Local storage can only return strings, and the ID indexing
            // uses a string anyway, so just turn the number provided into a string.
            return id.toString();
        } else {
            return window.localStorage['selectedStopID'];
        }
    }
    catch (e) {
        // Mimicks local storage behavior of returning empty string for unknown key.
        return "";
    }
}


export default class TransitBrowse {
    private transitMap: TransitMap;
    private stopDetailsViewModel: StopDetailsViewModel;

    constructor(private client: CorvallisBusClient, private stopDetailsDiv: HTMLElement,
        mapDiv: HTMLElement, userLocationButton: HTMLElement) {

        const initialStopID = window.location.hash
            ? window.location.hash.substr(1)
            : localStorageStopID();

        const placeholderStop: BusStop = {
            name: initialStopID ? "" : "Select a bus stop to get started",
            lat: 0, lng: 0, routeNames: [], id: 0, bearing: 0
        }

        this.stopDetailsViewModel = {
            selectedStop: ko.observable<BusStop>(placeholderStop),
            selectedStopArrivals: ko.observableArray<RouteArrivalsViewModel>(),
            selectedRouteName: ko.observable(""),
            setSelectedRoute: s => this.setSelectedRoute(s),
            errorMessage: ko.observable("")
        };

        setInterval(() => this.refreshStopDetails(), 30000);

        this.transitMap = new TransitMap(mapDiv, userLocationButton,
            client.getStaticData(), stop => this.setSelectedStop(stop), initialStopID);

        ko.applyBindings(this.stopDetailsViewModel, stopDetailsDiv);
    }

    refreshStopDetails() {
        const viewModel = this.stopDetailsViewModel;

        let didCallBack = false;

        let tasks = [
            this.client.getStaticData(),
            this.client.getArrivalsSummary(viewModel.selectedStop().id)
        ];

        Promise.all<any>(tasks).then(results => {
            let staticData: StaticData = results[0];
            let summaries: Array<RouteArrivalsSummary> = results[1];

            didCallBack = true;
            viewModel.errorMessage("");
            viewModel.selectedStopArrivals(summaries.map(summary => {
                return toRouteArrivalsViewModel(summary, staticData.routes[summary.routeName])
            }));

            // If the new arrivals information doesn't include the currently selected stop,
            // select the route which will arrive the soonest in the new data.
            if (viewModel.selectedStop().routeNames.indexOf(viewModel.selectedRouteName()) === -1) {
                this.setSelectedRoute(viewModel.selectedStopArrivals()[0].routeName);
            }
        }).catch(ignored => {
            didCallBack = true;
            viewModel.selectedStopArrivals([]);
            viewModel.errorMessage("An error occurred. Please try again later.");
        });

        // If the callback is fast, just go straight from showing old data to new data.
        // If the callback is slow, clear out the table while waiting for new data.
        setTimeout(() => {
            if (!didCallBack) {
                this.stopDetailsViewModel.selectedStopArrivals([]);
                this.setSelectedRoute(null);
            }
        }, 1000);
    }

    setSelectedStop(stop: BusStop) {
        localStorageStopID(stop.id);
        window.history.replaceState(null, '', '#' + stop.id);

        // Scroll so the whole table is visible on mobile devices
        this.stopDetailsDiv.scrollIntoView();

        this.stopDetailsViewModel.selectedStop(stop);
        this.refreshStopDetails();
    }

    /** Called by the stop details table in order to draw the polyline on the map. */
    setSelectedRoute(routeName: string | null) {
        this.stopDetailsViewModel.selectedRouteName(routeName);

        this.client.getStaticData().then(staticData => {
            const route = routeName ? staticData.routes[routeName] : null;
            this.transitMap.setSelectedRoute(route);
        });
    }
}


function toRouteArrivalsViewModel(summary: RouteArrivalsSummary, route: BusRoute): RouteArrivalsViewModel {
    return {
        routeName: summary.routeName,
        routeColor: route.color,
        routeURL: route.url,
        arrivalsSummary: summary.arrivalsSummary,
        scheduleSummary: summary.scheduleSummary
    };
}
