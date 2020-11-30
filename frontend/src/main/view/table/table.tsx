import React from 'react';
import './table.css';


type TableProps = {};
type TableStates = {};
class Table extends React.Component<TableProps, TableStates>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return (<h1>Table</h1>);
    }
}


export default Table;