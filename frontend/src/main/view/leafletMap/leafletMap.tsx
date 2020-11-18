import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon } from 'leaflet';
import { Popup, TileLayer, Marker, Rectangle, MapContainer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';
import countryData from '../../database/countries.json';


type LeafMapProps = {};
type LeafMapStates = { mapCenter: Leaflet.LatLng };
class LeafMap extends React.Component<LeafMapProps, LeafMapStates>
{
    constructor(props: any) {
        super(props);

        var mapCenter = Leaflet.latLng(39.8283, -98.5795);

        this.state = { mapCenter: mapCenter };
    }

    render() {
        const iconMarkup = ReactDOMServer.renderToStaticMarkup(<img id="markerIcon" src={pinIcon} />);
        const customMarkerIcon = divIcon({
            html: iconMarkup,
            iconAnchor: Leaflet.point(12.5, 40)
        });

        return (
            <MapContainer id="mapid" center={this.state.mapCenter} zoom={4} minZoom={4}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        );
    }

    markerArray() {

    }
}

export default LeafMap;