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
  
  constructor(private client: CorvallisBusClient, private stopDetailsDiv: HTMLElement,
              mapDiv: HTMLElement, userLocationButton: HTMLElement) {
    this.refreshStopDetails();
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
                        selectedStopArrivalsSummary={this.selectedStopArrivalsSummary} />,
                    this.stopDetailsDiv);
  }

  setSelectedStop(stop: BusStop) {
    this.selectedStop = stop;
    this.refreshStopDetails();
  }
}
