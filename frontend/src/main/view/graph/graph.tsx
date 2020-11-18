import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Rectangle } from 'react-leaflet';
import './graph.css';


type GraphProps = {};
type GraphStates = {};
class Graph extends React.Component
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return (<h1>Graph</h1>);
    }
}


export default Graph;