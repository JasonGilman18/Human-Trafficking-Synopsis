import React from 'react';
import closeIcon from './icon/times-solid.svg';
import './task.css';


interface Task_Data {status: boolean, name: string, close: boolean};

type TaskProps = {index: number, data: Task_Data, func_onUpdateTask: ((event: React.MouseEvent<HTMLElement>, index: number, close: boolean) => void)};
type TaskStates = {active: boolean};
class Task extends React.Component<TaskProps, TaskStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {active: this.props.data.status};
    }
    
    componentDidUpdate(prevProps: any)
    {
       if(this.props.data.status !== prevProps.data.status)
       {
            this.setState({active: this.props.data.status});
       }    
    }

    render()
    {
        return (

            <div className={"taskContainer " + this.state.active + " " + this.props.data.name} onClick={(event) => this.props.func_onUpdateTask(event, this.props.index, false)}>
                <div className={"standardizeWidth " + this.props.data.name}>
                    <h6 className={"taskLabel " + this.state.active}>{this.props.data.name}</h6>
                </div>
                <img className={this.props.data.close ? ("closeIcon " + this.state.active) : "hidden"} src={closeIcon} onClick={(event) => this.props.func_onUpdateTask(event, this.props.index, true)}></img>
            </div>
        );
    }
}

export default Task;
export type {Task_Data};