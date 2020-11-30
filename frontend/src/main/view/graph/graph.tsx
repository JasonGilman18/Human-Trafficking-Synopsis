import React from 'react';
import { Bar, Line, Doughnut} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './graph.css';

type GraphProps = {};
type GraphStates = {defaultProps: any, chartData: any};
class Graph extends React.Component<GraphProps, GraphStates>
{
    constructor(props: any)
    {
        super(props);
        
        this.state = {
            defaultProps: {
                displayTitle:true,
                displayLegend:true,
                legendPosition:'right',
                location:'City',
                chartTitle:'Largest Cities In '
            },
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
            <div className="graph">
                <Tabs>
                    <TabList>
                        <Tab>Bar</Tab>
                        <Tab>Line</Tab>
                        <Tab>Donut</Tab>
                    </TabList>
                
                    <TabPanel>
                        <Bar
                            data={this.state.chartData}
                            options={{
                                title:{
                                display:this.state.defaultProps.displayTitle,
                                text:this.state.defaultProps.chartTitle+this.state.defaultProps.location,
                                fontSize:25
                                },
                                legend:{
                                display:false,
                                position:this.state.defaultProps.legendPosition
                                }
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Line
                            data={this.state.chartData}
                            options={{
                                title:{
                                display:this.state.defaultProps.displayTitle,
                                text:'Largest Cities In '+this.state.defaultProps.location,
                                fontSize:25
                                },
                                legend:{
                                display:this.state.defaultProps.displayLegend,
                                position:this.state.defaultProps.legendPosition
                                }
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Doughnut
                            data={this.state.chartData}
                            options={{
                                title:{
                                display:this.state.defaultProps.displayTitle,
                                text:'Largest Cities In '+this.state.defaultProps.location,
                                fontSize:25
                                },
                                legend:{
                                display:this.state.defaultProps.displayLegend,
                                position:this.state.defaultProps.legendPosition
                                }
                            }}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}


export default Graph;