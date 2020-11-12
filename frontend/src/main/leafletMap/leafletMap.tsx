import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon } from 'leaflet';
import { TileLayer, Marker, Rectangle, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';

type LeafMapProps = {};
type LeafMapStates = {mapCenter: Leaflet.LatLng};
class LeafMap extends React.Component<LeafMapProps, LeafMapStates>
{
    constructor(props: any)
    {
        super(props);

        var mapCenter = Leaflet.latLng(30.6188, -96.3365);

        this.state = {mapCenter: mapCenter};
    }

    render() 
    {
        const iconMarkup = ReactDOMServer.renderToStaticMarkup(<img id="markerIcon" src={pinIcon}/>);
        const customMarkerIcon = divIcon({
            html: iconMarkup,
            iconAnchor: Leaflet.point(12.5, 40)
        });

        return (
            
            <MapContainer id="mapid" center={this.state.mapCenter} zoom={4} minZoom={4}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </MapContainer>
        );
    }
}

export default LeafMap;