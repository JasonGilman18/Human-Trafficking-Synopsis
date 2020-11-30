import React from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';


type TableViewProps = {};
type TableViewStates = {columns: any, data: any};
class TableView extends React.Component<TableViewProps, TableViewStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            columns : [
                {
                    dataField: 'year',
                    text: 'Year'
                },{
                    dataField: 'age',
                    text: 'Age'
                },{
                    dataField: 'state',
                    text: 'State'
                },{
                    dataField: 'region_description',
                    text: 'Region'
                }
            ],
            data: [
                {
                    "": "1",
                    age: "adult",
                    cleared: "3",
                    clr_per_100k: "4.07030778310687",
                    occ_per_100k: "14.9244618713918",
                    occurrence: "11",
                    offense: "commercial sex act",
                    population: "737045",
                    region: "9",
                    region_description: "Southwest/Pacific",
                    state: "Alaska",
                    year: "2014",
                    year_data: "0",
                },
                {
                    "": "3",
                    age: "adult",
                    cleared: "0",
                    clr_per_100k: "0",
                    occ_per_100k: "0",
                    occurrence: "0",
                    offense: "commercial sex act",
                    population: "38280824",
                    region: "9",
                    region_description: "Southwest/Pacific",
                    state: "California",
                    year: "2014",
                    year_data: "0"
                },
            ]
        }
    }

    renderData = (data: any, index: any) => {
        return(
            <tr key = {index}>
                <td>{data.year}</td>
                <td>{data.age}</td>
                <td>{data.state}</td>
                <td>{data.region_description}</td>

            </tr>
        )
    }

    render()
    {
        return (
            <div className="table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Age</th>
                            <th>State</th>
                            <th>Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(this.renderData)}
                    </tbody>
                </Table>
            </div>
        );
    }
}


export default TableView;