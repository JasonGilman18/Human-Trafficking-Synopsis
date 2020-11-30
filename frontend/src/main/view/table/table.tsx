import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './table.css';


type TableViewProps = {};
type TableViewStates = {products: any, columns: any};
class TableView extends React.Component<TableViewProps, TableViewStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            products: [{
                id: 1,
                name: "Product1",
                price: 120
            }, {
                id: 2,
                name: "Product2",
                price: 80
            }, {
                id:3,
                name: "Product3",
                price: 30
            }],
            columns : [{
                dataField: 'id',
                text: 'Product ID'
              }, {
                dataField: 'name',
                text: 'Product Name'
              }, {
                dataField: 'price',
                text: 'Product Price'
              }]
        }
    }

    render()
    {
        return (
            <div className="table">
                <BootstrapTable keyField='id' data={ this.state.products } columns={ this.state.columns } striped={true} hover={true}/>
            </div>
        );
    }
}


export default TableView;