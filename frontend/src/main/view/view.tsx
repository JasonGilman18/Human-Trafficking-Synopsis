import React from 'react';
import LeafMap from './leafletMap/leafletMap';
import './view.css';


interface View_Data {status: boolean, name: string, type: string};

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
        switch(this.props.data.type)
        {
            case("map"):

                return (

                    <div className={this.props.data.status ? "mapContainer" : "hidden"}>
                        <LeafMap>

                        </LeafMap>
                    </div>
                );

            case("graph"):

                    return (

                        <div className={this.props.data.status ? "graphContainer" : "hidden"}>
                            <h1>Graph</h1>
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