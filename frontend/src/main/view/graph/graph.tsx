import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Rectangle } from 'react-leaflet';
import './graph.css';


type GraphProps = {};
type GraphStates = {chartData: any};
class Graph extends React.Component<GraphProps, GraphStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            chartData: {
                labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets:[
                  {
                    label:'Population',
                    data:[
                      617594,
                      181045,
                      153060,
                      106519,
                      105162,
                      95072
                    ],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
              }
        }
    }

    render()
    {
        return (
            <div className="chart">
                <Bar data={this.state.chartData}></Bar>
            </div>
        );
    }
}


export default Graph;