import React from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';


type TableViewProps = {tableData: any};
type TableViewStates = {data: any};
class TableView extends React.Component<TableViewProps, TableViewStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            data: this.props.tableData
        }
    }

    toUpper(str: string){
        return str[0].toUpperCase() + str.slice(1);
    }

    renderData = (data: any, index: any) => {
        console.log("TEST");
        console.log(data);

        return(
            <tr key = {index}>
                <td>{data.year}</td>
                <td>{this.toUpper(data.age)}</td>
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