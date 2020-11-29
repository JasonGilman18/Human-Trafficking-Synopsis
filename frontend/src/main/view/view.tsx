import React from 'react';
import LeafMap from './leafletMap/leafletMap';
import Graph from './graph/graph';
import {DB_ROW} from './../main';
import './view.css';


interface View_Data {status: boolean, name: string, type: string};

type ViewProps = {index: number, data: View_Data, func_callDB: ((sql_command: string) => Promise<Array<DB_ROW>>)};
type ViewStates = {};
class View extends React.Component<ViewProps, ViewStates>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        switch(this.props.data.type)
        {
            case("map"):

                return (

                    <div className={this.props.data.status ? "mapContainer" : "hidden"}>
                        <LeafMap func_callDB={this.props.func_callDB}></LeafMap>
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
                            <h1>Table</h1>
                        </div>
                    );
        }
    }
}


export default View;
export type {View_Data};