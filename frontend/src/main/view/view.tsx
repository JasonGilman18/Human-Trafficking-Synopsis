import React from 'react';
import LeafMap from './leafletMap/leafletMap';
import GraphView from './graph/graph';
import TableView from './table/table';
import {DB_ROW} from './../main';
import './view.css';


interface View_Data {status: boolean, name: string, type: string, inputData: Map<string, string>, data: Array<DB_ROW>};

type ViewProps = {index: number, data: View_Data};
type ViewStates = {};
class View extends React.Component<ViewProps, ViewStates>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        if(this.props.data.status)
        {
            switch(this.props.data.type)
            {
                case("map"):

                    return (
                        <div className="mapContainer">
                            <LeafMap data={this.props.data.data} area={this.props.data.inputData.get("area")}></LeafMap>
                        </div>
                    );

                case("graph"):

                    return (

                        <div className={this.props.data.status ? "graphContainer" : "hidden"}>
                            <GraphView data={this.props.data.data} area={this.props.data.inputData.get("area")}></GraphView>
                        </div>
                    );

                case("table"):
                    
                    return (

                        <div className={this.props.data.status ? "tableContainer" : "hidden"}>
                            <TableView data={this.props.data.data}></TableView>
                        </div>
                    );
            }   
        }
        else
            return null;
    }
}


export default View;
export type {View_Data};