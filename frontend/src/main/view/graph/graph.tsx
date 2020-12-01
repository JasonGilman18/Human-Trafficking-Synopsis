import React from 'react';
import { Bar, Line, Doughnut} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './graph.css';

type GraphViewProps = {data: any, area: string | undefined};
type GraphViewStates = {defaultProps: any, chartData: any};
class GraphView extends React.Component<GraphViewProps, GraphViewStates>
{
    constructor(props: any)
    {
        super(props);
        
        let isRegion = true;
        //WILL CHANGE TO THIS.PROPS.ISREGION WHEN IMPLEMENTED

        let cLocation: string;
        if(isRegion)
            cLocation = "Region"
        else
            cLocation = "State"

        let [cName, cData] = this.sortByOccurrence(isRegion);

        this.state = {
            defaultProps: {
                displayTitle:true,
                displayLegend:true,
                legendPosition:'right',
                location:cLocation,
                chartTitle:'Most Occurrences By: '
            },
            chartData: {
                labels: cName,
                datasets:[
                  {
                    label:'Population',
                    data: cData,
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
              },        
        }
    }

    sortByOccurrence(isRegion: boolean){
        let data = this.props.data;
        let stateCount = 6;
        let topState = [];
        let topCount = [];

        if(!isRegion)
            for(var i = 0; i < data.length; i++){
                let statePos = this.uniqueState(data[i].state, topState);
                if(statePos == -1){
                    topState.push(data[i].state);
                    topCount.push(parseInt(this.normalizeNumber(data[i].occurence)));
                }else{
                    topCount[statePos] += parseInt(this.normalizeNumber(data[i].occurrence));
                }
            }
        else
            for(var i = 0; i < data.length; i++){
                let statePos = this.uniqueState(data[i].region_description, topState);
                if(statePos == -1){
                    topState.push(data[i].region_description);
                    topCount.push(parseInt(this.normalizeNumber(data[i].occurence)));
                }else{
                    topCount[statePos] += parseInt(this.normalizeNumber(data[i].occurrence));
                }
            }

        [topState, topCount] = this.sortArrays(topState, topCount);
        topState.splice(stateCount);
        topCount.splice(stateCount);

        return [topState, topCount];
    }

    sortArrays(state: Array<string>, count: Array<Number>){
        let tempState: any;
        let tempCount: any;
        for(var i = 0; i < count.length - 1; i++){
            for(var j = 0; j < count.length - i - 1; j++){
                if(count[j] < count[j + 1]){
                    tempState = state[j];
                    state[j] = state[j+1];
                    state[j+1] = tempState;

                    tempCount = count[j];
                    count[j] = count[j+1];
                    count[j+1] = tempCount;
                }
            }
        }
        return [state, count];
    }

    uniqueState(state: string, stateArr: Array<string>){
        for(var i = 0; i < stateArr.length; i++){
            if(state == stateArr[i])
                return i;
        }
        return -1;
    }

    normalizeNumber(n: any){
        if(n == undefined)
            return 0;
        else
            return n;
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
                                },
                                scales: {
                                    yAxes: [
                                      {
                                        ticks: {
                                          suggestedMin: 0
                                        }
                                      }
                                    ]
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
                                text:this.state.defaultProps.chartTitle+this.state.defaultProps.location,
                                fontSize:25
                                },
                                legend:{
                                display:this.state.defaultProps.displayLegend,
                                position:this.state.defaultProps.legendPosition
                                },
                                scales: {
                                    yAxes: [
                                      {
                                        ticks: {
                                          suggestedMin: 0
                                        }
                                      }
                                    ]
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
                                text:this.state.defaultProps.chartTitle+this.state.defaultProps.location,
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


export default GraphView;