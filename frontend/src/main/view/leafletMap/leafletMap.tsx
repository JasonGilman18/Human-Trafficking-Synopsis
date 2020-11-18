import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon } from 'leaflet';
import { TileLayer, Marker, Rectangle, MapContainer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';
import * as countryData from '../../database/countries.json';

type LeafMapProps = {};
type LeafMapStates = { mapCenter: Leaflet.LatLng };
const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }

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
                {countryData.map(country => (
                    <Marker 
                        key={country.COUNTRY} 
                        position={
                            Leaflet.latLng(Number(country.LATITUDE), Number(country.LONGITUDE))
                        }
                    />
                ))}
            </MapContainer>
        );
    }
}

export default LeafMap;