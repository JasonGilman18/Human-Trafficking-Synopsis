import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Rectangle } from 'react-leaflet';
import './table.css';


type TableProps = {};
type TableStates = {};
class Table extends React.Component
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