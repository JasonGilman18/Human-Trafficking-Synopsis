import React from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';


type TableViewProps = {data: any};
type TableViewStates = {data: any};
class TableView extends React.Component<TableViewProps, TableViewStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    toUpper(str: string){
        return str[0].toUpperCase() + str.slice(1);
    }

    renderData = (data: any, index: any) => {
        return(
            <tr key = {index}>
                <td>{data.year}</td>
                <td>{this.toUpper(data.age)}</td>
                <td>{data.occurrence}</td>
                <td>{data.cleared}</td>
                <td>{data.state}</td>
                <td>{data.region_description}</td>
                
            </tr>
        )
    }

    render()
    {
        return (
            <div className="table">
                <div className="tableFixHead">
                <Table striped bordered hover>
                    <thead>
                        <tr className="position-sticky">
                            <th>Year</th>
                            <th>Age</th>
                            <th>Occurrences</th>
                            <th>Cleared</th>
                            <th>State</th>
                            <th>Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(this.renderData)}
                    </tbody>
                </Table></div>
            </div>
        );
    }
}


export default TableView;