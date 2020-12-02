//@ts-nocheck
import React from 'react';
import Leaflet, { Control} from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './info.css';


class Info extends MapControl
{
    createLeafletElement(props: any)
    {
        const info = new Control({position: "topright"});

        info.onAdd = () => {

            this._div = Leaflet.DomUtil.create('div', 'info');
            this.update(props);
            return this._div;
        }

        return info;
    }

    update(props: any)
    {
        this._div.innerHTML = (props.hoverInformation.length!=0 ? '<b>' + props.hoverInformation[0] + '</b><br/>' + props.hoverInformation[1] + ' offenses' : 'Hover over a state');
    }
}

export default withLeaflet(Info);