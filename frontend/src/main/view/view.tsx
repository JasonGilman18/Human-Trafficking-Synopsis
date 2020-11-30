import React from 'react';
import LeafMap from './leafletMap/leafletMap';
import Graph from './graph/graph';
import TableView from './table/table';
import {DB_ROW} from './../main';
import './view.css';


interface View_Data {status: boolean, name: string, type: string};

type ViewProps = {index: number, data: View_Data, tableData_: any};
type ViewStates = {};
class View extends React.Component<ViewProps, ViewStates>
{
    constructor(props: any)
    {
        super(props);
    }

    /*
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
    */

    render()
    {
        switch(this.props.data.type)
        {
            case("map"):

                return (

                    <div className={this.props.data.status ? "mapContainer" : "hidden"}>
                        <LeafMap></LeafMap>
                    </div>
                );

            case("graph"):

                    return (

                        <div className={this.props.data.status ? "graphContainer" : "hidden"}>
                            <Graph></Graph>
                        </div>
                    );

            case("table"):
                    
                    return (

                        <div className={this.props.data.status ? "tableContainer" : "hidden"}>
                            <TableView tableData={this.props.tableData_}></TableView>
                        </div>
                    );
        }
    }
}


export default View;
export type {View_Data};