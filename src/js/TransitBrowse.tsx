import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';
import CorvallisBusClient from './CorvallisBusClient';
import './Models.ts';

export default class TransitBrowse {
  private transitMap: TransitMap;
  private selectedStop: BusStop;
  private selectedStopArrivalsViewModel: Array<RouteArrivalsViewModel> = [];
  private selectedRouteName: string;
  
  constructor(private client: CorvallisBusClient, private stopDetailsDiv: HTMLElement,
              mapDiv: HTMLElement, userLocationButton: HTMLElement) {
    this.refreshStopDetails()
    setInterval(() => this.refreshStopDetails(), 30000);
    
    this.transitMap = new TransitMap(mapDiv, userLocationButton,
      client.getStaticData(), stop => this.setSelectedStop(stop));
  }
  
  refreshStopDetails() {
    this.renderStopDetailsTable();
    
    // Only make an API call for arrival info if a stop is selected.
    if (!this.selectedStop) {
      return;
    }
    
    var didCallBack = false;
    
    let tasks = [
      this.client.getStaticData(),
      this.client.getArrivalsSummary(this.selectedStop.id)
    ];
    
    Promise.all<any>(tasks).then(results => {
      let staticData: StaticData = results[0];
      let summaries: Array<RouteArrivalsSummary> = results[1];
      
      didCallBack = true;
      this.selectedStopArrivalsViewModel = summaries.map(summary => {
        return toRouteArrivalsViewModel(summary, staticData.routes[summary.routeName])
      });
    
      // If the new arrivals information doesn't include the currently selected stop,
      // select the route which will arrive the soonest in the new data.
      if (this.selectedStop.routeNames.indexOf(this.selectedRouteName) === -1) {
        this.setSelectedRoute(this.selectedStopArrivalsViewModel[0].routeName);
      }
        
      this.renderStopDetailsTable();
    });
    
    // If the callback is fast, just go straight from showing old data to new data.
    // If the callback is slow, clear out the table while waiting for new data. 
    setTimeout(() => {
      if (!didCallBack) {
        this.selectedStopArrivalsViewModel = [];
        this.setSelectedRoute(null);
        this.renderStopDetailsTable();
      }
    }, 1000);
  }
  
  renderStopDetailsTable() {
    ReactDOM.render(<StopDetailsTable selectedStop={this.selectedStop}
                        selectedStopArrivalsViewModel={this.selectedStopArrivalsViewModel}
                        selectedRouteName={this.selectedRouteName}
                        setSelectedRoute={routeName => this.setSelectedRoute(routeName)} />,
                    this.stopDetailsDiv);
  }

  setSelectedStop(stop: BusStop) {
    // Scroll so the whole table is visible on mobile devices
    this.stopDetailsDiv.scrollIntoView();
    
    this.selectedStop = stop;
    this.refreshStopDetails();
  }
  
  /** Called by the stop details table in order to draw the polyline on the map. */
  setSelectedRoute(routeName: string) {
    this.selectedRouteName = routeName;
    this.renderStopDetailsTable();

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
