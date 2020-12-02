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


interface DB_ROW {year: string, region: string, region_description: string, state: string, offense: string, occurrence: string, age: string, cleared: string, population: string, occ_per_100k: string, clr_per_100k: string};


type MainProps = {};
type MainStates = {tasks: Array<Task_Data>, views: Array<View_Data>, inputData: Map<string, string>};
class Main extends React.Component<MainProps, MainStates>
{
    constructor(props: any)
    {
        super(props);

        var temp_input_data: Map<string, string> = new Map([["year_2014", ""], ["year_2015", ""], ["year_2016", ""], ["year_2017", ""], ["type1", ""], ["type2", ""], ["area", "region"], ["age1", "0"], ["age2", "100"], ["occurances1", "0"], ["occurances2", "100"], ["clearances1", "0"], ["clearances2", "100"]]);

        

        this.state = {tasks: [], views: [], inputData: temp_input_data};

        this.updateTask = this.updateTask.bind(this);
        this.openNewTasks = this.openNewTasks.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.callDB = this.callDB.bind(this);
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
        }
        
        this.setState({tasks: tempTasks, views: tempViews});
    }

    openNewTasks(data: Array<DB_ROW>, inputData: Map<string, string>)
    {
        var temp_views = this.state.views;
        for(var i=0; i<temp_views.length;i++)
            temp_views[i].status = false;
        var new_graph_view: View_Data = {status: false, name: "graph", type: "graph", inputData: inputData, data: data};
        var new_table_view: View_Data = {status: false, name: "table", type: "table", inputData: inputData, data: data};
        var new_map_view: View_Data = {status: true, name: "map", type: "map", inputData: inputData, data: data};
        temp_views.push(new_map_view, new_graph_view, new_table_view);

        var temp_tasks = this.state.tasks;
        for(var i=0; i<temp_tasks.length;i++)
            temp_tasks[i].status = false;
        var new_graph_task: Task_Data = {status: false, name: "Graph", close: true};
        var new_table_task: Task_Data = {status: false, name: "Table", close: true};
        var new_map_task: Task_Data = {status: true, name: "Map", close: true};
        temp_tasks.push(new_map_task, new_graph_task, new_table_task);
        
        this.setState({tasks: temp_tasks, views: temp_views});
    }

    handleFormInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, input: string)
    {
        var temp_input_data: Map<string, string> = this.state.inputData;
        temp_input_data.set(input, e.currentTarget.value);
        this.setState({inputData: temp_input_data});
    }

    search(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();

        //capture inputs
        //create query
        //call db with query
        const inputData = this.state.inputData;
        const sql_command = this.createQuery(inputData);
        this.callDB(sql_command).then((data: any) => {
            
            this.openNewTasks(data, inputData);
        });
    }

    createQuery(input: Map<string, string>)
    {
        var sql_command = "SELECT * FROM human_offenses_clearance";

        return sql_command;
    }

    async callDB(sql_command: string)
    {
        ipcRenderer.send('db', sql_command);

        return new Promise(resolve => {
            
            ipcRenderer.on('db', (event: any, arg: any) => {
                
                resolve(arg);
            });
        });
    }

    render()
    {
        return (

            <div className="mainContainer">
                <Header></Header>
                <div className="middleContainer">
                    <form className="inputContainer" onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.search(e)}>
                        <div className="typeContainer">
                            <div className="inputTypeContainer">
                                <CheckBoxInput label="Year Selection" values={["2014", "2015", "2016", "2017"]} inputNames={["year_2014", "year_2015", "year_2016", "year_2017"]} func_handleFormInput={this.handleFormInput.bind(this)}></CheckBoxInput>
                            </div>
                            <div className="inputTypeContainer">
                                <CheckBoxInput label="Type of Offense" values={["Commercial Sex Act", "Involuntary Servitude"]} inputNames={["type1", "type2"]} func_handleFormInput={this.handleFormInput.bind(this)}></CheckBoxInput>
                                <DropDownInput label="Area of Interest" values={["Region", "State"]} inputName={"area"} func_handleFormInput={this.handleFormInput.bind(this)}></DropDownInput>
                            </div>
                            <div className="inputTypeContainer">
                                <TextInput label="Age Range" placeholder1="0" placeholder2="100" inputNames={["age1", "age2"]} func_handleFormInput={this.handleFormInput.bind(this)}></TextInput>
                                <TextInput label="Number of Occurances" placeholder1="0" placeholder2="100" inputNames={["occurances1", "occurances2"]} func_handleFormInput={this.handleFormInput.bind(this)}></TextInput>
                                <TextInput label="Number of Clearances" placeholder1="0" placeholder2="100" inputNames={["clearances1", "clearances2"]} func_handleFormInput={this.handleFormInput.bind(this)}></TextInput>
                            </div>
                        </div>
                        <div className="searchContainer">
                            <button className="searchBtn" type="submit">Search</button>
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