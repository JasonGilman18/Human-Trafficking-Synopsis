import React from 'react';
import Header from './header/header';
import TextInput from './textInput/textInput';
import SliderInput from './sliderInput/sliderInput';
import Task, {Task_Data} from './task/task';
import View, {View_Data} from './view/view';
import './main.css';


type MainProps = {};
type MainStates = {tasks: Array<Task_Data>, views: Array<View_Data>};
class Main extends React.Component<MainProps, MainStates>
{
    constructor(props: any)
    {
        super(props);
        
        var map_task: Task_Data = {status: true, name: "Map", close: false};
        var graph_task: Task_Data = {status: false, name: "Graph", close: true};
        var table_task: Task_Data = {status: false, name: "Table name is realy", close: true};

        var map_view: View_Data = {status: true, name: "map", type: "map"};
        var graph_view: View_Data = {status: false, name: "graph", type: "graph"};
        var table_view: View_Data = {status: false, name: "table", type: "table"};
        
        this.state = {tasks: [map_task, graph_task, table_task], views: [map_view, graph_view, table_view]};

        this.updateTask = this.updateTask.bind(this);
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

    render()
    {
        return (

            <div className="mainContainer">
                <Header></Header>
                <div className="middleContainer">
                    <div className="inputContainer">
                        <div className="typeContainer">
                            <div className="inputTypeContainer">
                                <TextInput label="input 1" placeholder="placeholder for input"></TextInput>
                                <TextInput label="input 2" placeholder="placeholder for input"></TextInput>
                            </div>
                            <div className="inputTypeContainer">
                                <SliderInput label="input3" minVal="0" maxVal="100" step="1"></SliderInput>
                                <SliderInput label="input4" minVal="0" maxVal="100" step="1"></SliderInput>
                            </div>
                        </div>
                        <div className="searchContainer">
                            <button className="searchBtn">Search</button>
                        </div>
                    </div>
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