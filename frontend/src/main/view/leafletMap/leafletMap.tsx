import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon, LeafletMouseEvent } from 'leaflet';
import { Popup, TileLayer, Marker, Rectangle, Circle, Map as LeafletMap } from 'react-leaflet';
import {DB_ROW} from './../../main';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';


type LeafMapProps = {func_callDB: ((sql_command: string) => Promise<Array<DB_ROW>>)};
type LeafMapStates = { mapCenter: Leaflet.LatLng };
class LeafMap extends React.Component<LeafMapProps, LeafMapStates>
{
    constructor(props: any) {
        super(props);

        var mapCenter = Leaflet.latLng(39.8283, -98.5795);

        this.state = { mapCenter: mapCenter };
    }

    componentDidMount()
    {
        var regions = new Map<string, number>();

        const db_call = this.props.func_callDB("SELECT * FROM human_offenses_clearance;");
        db_call.then((data) => {

            for(var row of data)
            {
                var current_occurences = regions.get(row.region);

                if(current_occurences)
                    regions.set(row.region, current_occurences + parseInt(row.occurrence));
                else
                    regions.set(row.region, parseInt(row.occurrence));
            }

            //in another function
            //figure out how to size the hotspots based on the number in Map
            //create hotspots and add them to state
            //in HTML add hotspots
        });
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
            </LeafletMap>
        );
    }
}

export default LeafMap;