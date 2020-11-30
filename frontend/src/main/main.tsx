import React from 'react';
import Header from './header/header';
import TextInput from './textInput/textInput';
import SliderInput from './sliderInput/sliderInput';
import CheckBoxInput from './checkboxInput/checkboxInput';
import DropDownInput from './dropdownInput/dropdownInput';
import Task, {Task_Data} from './task/task';
import View, {View_Data} from './view/view';
import './main.css';

const {ipcRenderer} = window.require('electron');


interface DB_ROW {index: string, year: string, region_index: string, region: string, state: string, offense: string, occurrence: string, age: string, cleared: string, population: string, occ_per_100k: string, clr_per_100k: string};


type MainProps = {};
type MainStates = {tasks: Array<Task_Data>, views: Array<View_Data>, sampleData: Array<DB_ROW>};
class Main extends React.Component<MainProps, MainStates>
{
    constructor(props: any)
    {
        super(props);
        
        var map_task: Task_Data = {status: true, name: "Map", close: false};
        var graph_task: Task_Data = {status: false, name: "Graph", close: true};
        var table_task: Task_Data = {status: false, name: "Table", close: true};

        var map_view: View_Data = {status: true, name: "map", type: "map"};
        var graph_view: View_Data = {status: false, name: "graph", type: "graph"};
        var table_view: View_Data = {status: false, name: "table", type: "table"};
        
        this.state = {tasks: [map_task, graph_task, table_task], views: [map_view, graph_view, table_view], sampleData: []};

        this.updateTask = this.updateTask.bind(this);
        this.search = this.search.bind(this);
    }

    updateTask(event: React.MouseEvent<HTMLElement>, taskIndex: number, close: boolean)
    {
        event.stopPropagation();

        var tempTasks = this.state.tasks;
        var tempViews = this.state.views;

        if(close)
        {
            if(!tempTasks[0].status)
            {
                tempTasks[0].status = tempTasks[taskIndex].status;
                tempViews[0].status = tempTasks[taskIndex].status;
            }

            tempTasks.splice(taskIndex, 1);
            tempViews.splice(taskIndex, 1);
        }
        else
        {
            
            for(var i=0;i<tempTasks.length;i++)
            {
                if(i==taskIndex)
                {
                    tempTasks[i].status = true;
                    tempViews[i].status = true;
                }
                else
                {
                    tempTasks[i].status = false;
                    tempViews[i].status = false;
                }  
            }
            console.log(tempTasks)
        }
        
        this.setState({tasks: tempTasks, views: tempViews});
    }

    search()
    {
        //capture inputs
        //create query
        //based on query then deal with returned data (create markers, rectangles etc)

        //combo button for year
        //combo box for type of offense
        //dropdown for region or state level
        //slider for age
        //text input for for number of occurances
        //text input for number of clearances
    }

    async callDB(sql_command: string)
    {
        ipcRenderer.send('db', sql_command);

        const db_call = new Promise(resolve => {
            
            ipcRenderer.on('db', (event: any, arg: any) => {
                
                resolve(arg);
            });
        });

        db_call.then((data: any) => {

            this.setState({sampleData: data});
            console.log(this.state.sampleData);
        });
    }

    render()
    {
        return (

            <div className="mainContainer">
                <Header></Header>
                <div className="middleContainer">
                    <form className="inputContainer">
                        <div className="typeContainer">
                            <div className="inputTypeContainer">
                                <CheckBoxInput label="Year Selection" values={["2014", "2015", "2016", "2017"]}></CheckBoxInput>
                            </div>
                            <div className="inputTypeContainer">
                                <CheckBoxInput label="Type of Offense" values={["Commercial Sex Act", "Involuntary Servitude"]}></CheckBoxInput>
                                <DropDownInput label="Area of Interest" values={["Region", "State"]}></DropDownInput>
                            </div>
                            <div className="inputTypeContainer">
                                
                            </div>
                            <div className="inputTypeContainer">
                                <TextInput label="Age Range" placeholder1="0" placeholder2="100"></TextInput>
                                <TextInput label="Number of Occurances" placeholder1="0" placeholder2="100"></TextInput>
                                <TextInput label="Number of Clearances" placeholder1="0" placeholder2="100"></TextInput>
                            </div>
                        </div>
                        <div className="searchContainer">
                            <button className="searchBtn" onClick={() => this.search}>Search</button>
                        </div>
                    </form>
                    <div className="outputContainer">
                        <div className="taskbar">
                            {
                                this.state.tasks.map((task, index) => (

                                    <Task index={index} data={task} func_onUpdateTask={this.updateTask.bind(this)}></Task>
                                ))
                            }
                        </div>
                        <div className="contentContainer">
                            {
                                this.state.views.map((view, index) => (

                                    <View index={index} data={view}></View>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
export type {DB_ROW};