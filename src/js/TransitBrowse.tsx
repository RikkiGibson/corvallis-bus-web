import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ko from 'knockout';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';
import CorvallisBusClient from './CorvallisBusClient';
import './Models.ts';

interface StopDetailsViewModel {
  selectedStop: KnockoutObservable<BusStop>;
  selectedStopArrivals: KnockoutObservable<Array<RouteArrivalsViewModel>>;
  selectedRouteName: KnockoutObservable<string>;
  setSelectedRoute: (string) => void;
}

export default class TransitBrowse {
  private transitMap: TransitMap;
  private stopDetailsViewModel: StopDetailsViewModel;
  
  constructor(private client: CorvallisBusClient, private stopDetailsDiv: HTMLElement,
              mapDiv: HTMLElement, userLocationButton: HTMLElement) {
             
    const initialStopID = window.location.hash
      ? window.location.hash.substr(1) 
      : window.localStorage['selectedStopID'];
         
    const placeholderStop: BusStop = {
      name: initialStopID ? "" : "Select a bus stop to get started",
      lat: 0, lng: 0, routeNames: [], id: 0
    }
    
    this.stopDetailsViewModel = {
      selectedStop: ko.observable<BusStop>(placeholderStop),
      selectedStopArrivals: ko.observableArray<RouteArrivalsViewModel>(),
      selectedRouteName: ko.observable(""),
      setSelectedRoute: s => this.setSelectedRoute(s)
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
      viewModel.selectedStopArrivals(summaries.map(summary => {
        return toRouteArrivalsViewModel(summary, staticData.routes[summary.routeName])
      }));
    
      // If the new arrivals information doesn't include the currently selected stop,
      // select the route which will arrive the soonest in the new data.
      if (viewModel.selectedStop().routeNames.indexOf(viewModel.selectedRouteName()) === -1) {
        this.setSelectedRoute(viewModel.selectedStopArrivals()[0].routeName);
      }
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
    window.localStorage['selectedStopID'] = stop.id;
    window.history.replaceState(null, '', '#' + stop.id);
    
    // Scroll so the whole table is visible on mobile devices
    this.stopDetailsDiv.scrollIntoView();
    
    this.stopDetailsViewModel.selectedStop(stop);
    this.refreshStopDetails();
  }
  
  /** Called by the stop details table in order to draw the polyline on the map. */
  setSelectedRoute(routeName: string) {
    this.stopDetailsViewModel.selectedRouteName(routeName);

    this.client.getStaticData().then(staticData => {
      this.transitMap.setSelectedRoute(staticData.routes[routeName]);
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
