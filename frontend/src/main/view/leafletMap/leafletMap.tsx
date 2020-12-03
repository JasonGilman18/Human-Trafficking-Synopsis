import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Leaflet, { divIcon, LeafletEvent, Layer, LeafletMouseEvent, popup } from 'leaflet';
import { TileLayer, Map as LeafletMap, GeoJSON, Popup } from 'react-leaflet';
import {DB_ROW} from './../../main';
import 'leaflet/dist/leaflet.css';
import './leafletMap.css';
import pinIcon from './icons/pin.png';
import {statesData} from './us-states';
import {regionsData} from './us-regions';
import { Feature, GeoJSON as geojson } from 'geojson';
import Legend from './legend';


type LeafMapProps = {data: Array<DB_ROW>, area: string | undefined};
type LeafMapStates = {mapCenter: Leaflet.LatLng, area: string | undefined, data: Array<DB_ROW>, hotspots: Array<Feature>, popups: Array<JSX.Element>};
class LeafMap extends React.Component<LeafMapProps, LeafMapStates>
{
    constructor(props: any) {
        super(props);

        var mapCenter = Leaflet.latLng(39.8283, -98.5795);

        this.state = {mapCenter: mapCenter, area: this.props.area, data: this.props.data, hotspots: [], popups: []};

        this.createHotspots = this.createHotspots.bind(this);
    }

    componentDidMount()
    {
        const data = this.state.data;
        if(data.length > 0)
            this.createHotspots(data);
    }

    shouldComponentUpdate(nextProps: any, nextState: any)
    {
        if(this.state.data != nextProps.data || this.state.area != nextProps.area)
            return false;
        else
            return true;
    }
    
    createHotspots(data: Array<DB_ROW>)
    {
        var occurances = new Map<string, number>();
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
            }
        });

        var hotspots;
        if(area == "State")
            hotspots = this.handleStates(occurances);
        else
            hotspots = this.handleRegions(occurances);
        

        this.setState({hotspots: hotspots});
    }

    handleStates(occurances: Map<string, number>): Array<Feature>
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

    handleRegions(occurances: Map<string, number>): Array<Feature>
    {
        var regions = regionsData;

        regions.forEach((region) => {

            var num_occurances = occurances.get(region.properties.name)!;
            region.properties.occurances = num_occurances;
            
            var style = {

                fillColor: this.getColor(num_occurances),
                weight: 2,
                opacity: 1,
                color: this.getColor(num_occurances),
                dashArray: '3',
                fillOpacity: .7
            };
            region.properties.style = style;
        });

        return regions;
    }

    getColor(num_occurances: number)
    {
        if(num_occurances != undefined)
        {
            if(num_occurances <= 25)
                return '#ffec99';
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

    handleInteraction(feature: Feature, layer: Layer)
    {
        layer.on({
            mouseover: this.handleHover,
            mouseout: (e: LeafletEvent) => this.resetHover(e, feature.properties?.occurances),
            click: (e: LeafletMouseEvent) => this.handleClick(e, feature.properties?.name,feature.properties?.occurances)
        });
    }

    handleHover(e: LeafletEvent)
    {
        e.target.setStyle({

            color: "#666",
            weight: 5,
            dashArray: '',
            fillOpacity: .7
        });

        if(!Leaflet.Browser.ie && !Leaflet.Browser.opera && !Leaflet.Browser.edge)
        {
            e.target.bringToFront();
        }
    }

    resetHover(e: LeafletEvent, num_occurances: number)
    {
        var color;
        if(this.state.area == "State")
            color = "white";
        else
            color = this.getColor(num_occurances);

        e.target.setStyle({
            
            color: color,
            weight: 2,
            dashArray: '3'
        });
    }

    handleClick(e: LeafletMouseEvent, name: string, occ: string)
    {
        var popups = this.state.popups;
        var new_popup = <Popup position={e.latlng}>{(this.state.area=="State" ? "State: " : "Region: ") + name}<br></br>{"Offenses: " + occ}</Popup>;
        popups.push(new_popup);
        this.setState({popups: popups});
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
                <GeoJSON data={this.state.hotspots} style={(feature) => (feature?.properties.style)} onEachFeature={(feature: Feature, layer: Layer) => this.handleInteraction(feature, layer)}></GeoJSON>
                <Legend></Legend>
                {
                    this.state.popups.map((popup) => (
                        popup
                    ))
                }
            </LeafletMap>
        );
    }
}

export default LeafMap;