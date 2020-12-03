import React from 'react';
import Leaflet, { Control} from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './legend.css';


class Legend extends MapControl
{
    createLeafletElement(props: any)
    {
        const legend = new Control({position: "bottomright"});

        legend.onAdd = () => {

            const div = Leaflet.DomUtil.create("div", "info legend");
            const grades = [0, 25, 50, 100, 200, 500, 1000, 2000];
            var labels = [];
            var from;
            var to;

            for(var i=0; i<grades.length;i++)
            {
                from = grades[i];
                to = grades[i+1];

                labels.push(
                    '<i style="background:' + 
                    this.getColor(from+1) +
                    '"></i>' +
                    from +
                    (to ? "&ndash;" + to : "+")
                );
            }

            div.innerHTML = "# Offenses<br>" + labels.join("<br>");
            return div;
        };
        
        return legend;
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
}

export default withLeaflet(Legend);