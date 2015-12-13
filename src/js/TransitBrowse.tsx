import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';
import CorvallisBusClient from './CorvallisBusClient';
import './Models.ts';

export default class TransitBrowse {
  private transitMap: TransitMap;
  private selectedStop: BusStop;
  private selectedStopArrivalsSummary: Array<RouteArrivalsSummary> = [];
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
    
    if (this.selectedStop) {
      let didCallBack = false;
      
      this.client.getArrivalsSummary(this.selectedStop.id).then(arrivalsSummaries => {
        didCallBack = true;
        this.selectedStopArrivalsSummary = arrivalsSummaries
        this.renderStopDetailsTable();
      });
      
      setTimeout(() => {
        if (!didCallBack) {
          this.selectedStopArrivalsSummary = [];
          this.renderStopDetailsTable();
        }
      }, 1000);
    }
  }
  
  renderStopDetailsTable() {
    ReactDOM.render(<StopDetailsTable selectedStop={this.selectedStop}
                        selectedStopArrivalsSummary={this.selectedStopArrivalsSummary}
                        selectedRouteName={this.selectedRouteName}
                        setSelectedRoute={routeName => this.setSelectedRoute(routeName)} />,
                    this.stopDetailsDiv);
  }

  setSelectedStop(stop: BusStop) {
    this.selectedStop = stop;
    this.refreshStopDetails();
    
    if (stop.routeNames.indexOf(this.selectedRouteName) === -1) {
      this.setSelectedRoute(stop.routeNames[0]);
    }
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
