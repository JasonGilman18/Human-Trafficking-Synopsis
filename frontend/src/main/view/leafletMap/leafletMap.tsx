import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon, LeafletMouseEvent } from 'leaflet';
import { TileLayer, Map as LeafletMap, GeoJSON } from 'react-leaflet';
import hash from 'object-hash';
import {DB_ROW} from './../../main';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';
import {statesData} from './us-states';
import { GeoJSON as geojson } from 'geojson';


type LeafMapProps = {data: Array<DB_ROW>};
type LeafMapStates = {mapCenter: Leaflet.LatLng, data: Array<DB_ROW>, hotspots: Array<geojson>};
class LeafMap extends React.Component<LeafMapProps, LeafMapStates>
{
    constructor(props: any) {
        super(props);

        var mapCenter = Leaflet.latLng(39.8283, -98.5795);

        this.state = {mapCenter: mapCenter, data: this.props.data, hotspots: []};

        this.createHotspots = this.createHotspots.bind(this);
    }

    componentDidMount()
    {
        const data = this.state.data;
        this.createHotspots(data);
    }

    createHotspots(data: Array<DB_ROW>)
    {
        
    }

    render() {
        const iconMarkup = ReactDOMServer.renderToStaticMarkup(<img id="markerIcon" src={pinIcon} />);
        const customMarkerIcon = divIcon({
            html: iconMarkup,
            iconAnchor: Leaflet.point(12.5, 40)
        });

        return (
            <LeafletMap id="mapid" center={this.state.mapCenter} zoom={4} minZoom={4}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON data={statesData}></GeoJSON>
            </LeafletMap>
        );
    }
}

export default LeafMap;