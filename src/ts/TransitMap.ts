/// <reference types="googlemaps" />

import { getUserLocation } from "./CorvallisBusClient";
import './Models.ts';

declare global {
    namespace google.maps {
        interface Polyline {
            /** Removes the polyline from the map. */
            setMap(map: null): void;
        }
    }
}

// TODO: fix bounding boxes so it's easier to tap on the correct marker
const USER_LOCATION_ICON: google.maps.Icon = {
    url: require("../img/user-location.png"),
    size: new google.maps.Size(66, 66),
    scaledSize: new google.maps.Size(22, 22),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(11, 11)
};

const BUS_STOP_ICON_WIDTH = 45;
const BUS_STOP_ICON_HEIGHT = 90;
const BUS_STOP_ICON_SCALE = 1 / 2.6;
const BUS_STOP_ICON_SELECTED_SCALE = 1 / 2.3;
const BUS_STOP_ICON: google.maps.Icon = {
    url: require("../img/greenoval.png"),
    size: new google.maps.Size(BUS_STOP_ICON_WIDTH, BUS_STOP_ICON_HEIGHT),
    scaledSize: new google.maps.Size(BUS_STOP_ICON_WIDTH * BUS_STOP_ICON_SCALE,
        BUS_STOP_ICON_HEIGHT * BUS_STOP_ICON_SCALE),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(BUS_STOP_ICON_WIDTH * BUS_STOP_ICON_SCALE / 2,
        BUS_STOP_ICON_HEIGHT * BUS_STOP_ICON_SCALE)
};

const BUS_STOP_SELECTED_ICON: google.maps.Icon = {
    url: require("../img/greenoval-highlighted.png"),
    size: new google.maps.Size(BUS_STOP_ICON_WIDTH, BUS_STOP_ICON_HEIGHT),
    scaledSize: new google.maps.Size(BUS_STOP_ICON_WIDTH * BUS_STOP_ICON_SELECTED_SCALE,
        BUS_STOP_ICON_HEIGHT * BUS_STOP_ICON_SELECTED_SCALE),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(BUS_STOP_ICON_WIDTH * BUS_STOP_ICON_SELECTED_SCALE / 2,
        BUS_STOP_ICON_HEIGHT * BUS_STOP_ICON_SELECTED_SCALE)
};

export default class TransitMap {
    private map: google.maps.Map;
    private stopMarkers: { [stopID: string]: google.maps.Marker } = {};
    private userLocation: google.maps.Marker;
    private selectedRoute: BusRoute | null;
    private selectedStopID: number;

    constructor(mapDiv: HTMLElement, userLocationButton: HTMLElement,
        private staticDataPromise: Promise<StaticData>,
        private setSelectedStop: (BusStop) => void,
        initialStopID?: string) {
        this.map = new google.maps.Map(mapDiv, {
            center: new google.maps.LatLng(44.56802, -123.27926),
            zoom: 15
        });

        userLocationButton.onclick = () => this.onClickUserLocation();

        staticDataPromise.then(staticData => {
            for (var key in staticData.stops) {
                this.stopMarkers[key] = this.makeMapMarker(staticData.stops[key]);
            }
            if (initialStopID) {
                this.map.setCenter(staticData.stops[initialStopID]);
                google.maps.event.trigger(this.stopMarkers[initialStopID], 'click');
            }
        });
    }

    makeMapMarker(stop: BusStop): google.maps.Marker {
        var marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(stop.lat, stop.lng),
            icon: BUS_STOP_ICON
        });

        marker.addListener('click', () => this.onClickMapMarker(marker, stop));

        return marker;
    }

    onClickMapMarker(marker: google.maps.Marker, stop: BusStop) {
        // Clear out the old marker
        var oldStop = this.stopMarkers[this.selectedStopID];
        if (oldStop) {
            oldStop.setIcon(BUS_STOP_ICON);
            oldStop.setZIndex(google.maps.Marker.MAX_ZINDEX);
        }
        this.selectedStopID = stop.id;
        this.setSelectedStop(stop);
        marker.setIcon(BUS_STOP_SELECTED_ICON);
        marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    }

    onClickUserLocation() {
        getUserLocation(location => {
            var latLng = {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
            this.map.panTo(latLng);
            if (this.userLocation) {
                this.userLocation.setPosition(latLng);
            } else {
                var coords = location.coords;
                this.userLocation = new google.maps.Marker({
                    map: this.map,
                    position: new google.maps.LatLng(coords.latitude, coords.longitude),
                    icon: USER_LOCATION_ICON
                });
            }
        });
    }

    /** Called by the parent to inform that the table selected a particular route. */
    setSelectedRoute(route: BusRoute | null) {
        if (this.selectedRoute === route) {
            return;
        }
        if (this.selectedRoute && this.selectedRoute.googlePolyline) {
            this.selectedRoute.googlePolyline.setMap(null);
        }
        // If no route was provided, just deselect the previous route.
        if (!route) {
            this.selectedRoute = null;
            return;
        }
        route.googlePolyline = route.googlePolyline || new google.maps.Polyline({
            path: google.maps.geometry.encoding.decodePath(route.polyline),
            strokeColor: "#" + route.color,
            strokeOpacity: 1,
            strokeWeight: 4
        });
        route.googlePolyline.setMap(this.map);

        this.selectedRoute = route;
    }
}
