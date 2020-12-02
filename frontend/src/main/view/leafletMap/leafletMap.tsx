import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon, LeafletMouseEvent } from 'leaflet';
import { TileLayer, Map as LeafletMap, GeoJSON } from 'react-leaflet';
import {DB_ROW} from './../../main';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';
import {statesData} from './us-states';
import {regionsData} from './us-regions';
import { GeoJSON as geojson } from 'geojson';


type LeafMapProps = {data: Array<DB_ROW>, area: string | undefined};
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
        if(data.length > 0)
            this.createHotspots(data);
    }

    createHotspots(data: Array<DB_ROW>)
    {
        var occurances = new Map<string, number>();
        var s = new Map<string, Map<string, number>>();
        const area = this.props.area;
        data.forEach((row) => {

            if(area == "State")
            {
                var temp_num_occurances = occurances.get(row.state);
                if(temp_num_occurances != 0 && temp_num_occurances != undefined)
                    occurances.set(row.state, temp_num_occurances + parseInt(row.occurrence));
                else
                    occurances.set(row.state, parseInt(row.occurrence));
            }
            else
            {
                var temp_num_occurances = occurances.get(row.region_description);

                if(temp_num_occurances != 0 && temp_num_occurances != undefined)
                    occurances.set(row.region_description, temp_num_occurances + parseInt(row.occurrence));
                else
                    occurances.set(row.region_description, parseInt(row.occurrence));

                var temp = s.get(row.region_description);

                if(temp != undefined)
                {
                    temp.set(row.state, 1);
                    s.set(row.region_description, temp);
                }
                else
                {
                    var t = new Map<string, number>();
                    t.set(row.state, 1);
                    s.set(row.region_description, t);
                }
            }
        });

        console.log(s);

        var hotspots;
        if(area == "State")
            hotspots = this.handleStates(occurances);
        else
            hotspots = this.handleRegions(occurances);
        

        this.setState({hotspots: hotspots});
    }

    handleStates(occurances: Map<string, number>): Array<geojson>
    {
        var states = statesData;
        states.forEach((state) => {

            var stateName = state.properties.name;
            var num_occurances;
            if(occurances.has(stateName))
                num_occurances = occurances.get(stateName)!;
            else
                num_occurances = 0;
            
            state.properties.occurances = num_occurances;

            var style = {

                fillColor: this.getColor(num_occurances),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: .7
            };
            state.properties.style = style;
        });

        return states;
    }

    handleRegions(occurances: Map<string, number>): Array<geojson>
    {
        var states = statesData;

        states.forEach((state) => {

            var stateName = state.properties.name;
            var num_occurances;
            if(regionsData[stateName] != undefined)
                num_occurances = occurances.get(regionsData[stateName])!;
            else
                num_occurances = 0;

            state.properties.occurances = num_occurances;

            var style = {

                fillColor: this.getColor(num_occurances),
                weight: 2,
                opacity: 1,
                color: this.getColor(num_occurances),
                dashArray: '0',
                fillOpacity: .7
            };
            state.properties.style = style;
        });

        return states;
    }

    getColor(num_occurances: number)
    {
        if(num_occurances != undefined)
        {
            if(num_occurances <= 25)
                return '#FFEDA0';
            else if(num_occurances <= 50)
                return '#FED976';
            else if(num_occurances <= 100)
                return '#FEB24C';
            else if(num_occurances <= 200)
                return '#FD8D3C';
            else if(num_occurances <= 500)
                return '#FC4E2A';
            else if(num_occurances <= 1000)
                return '#E31A1C';
            else if(num_occurances <= 2000)
                return '#BD0026';
            else
                return '#800026';
        }
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
                <GeoJSON data={this.state.hotspots} style={(feature) => (feature?.properties.style)}></GeoJSON>
            </LeafletMap>
        );
    }
}

export default LeafMap;