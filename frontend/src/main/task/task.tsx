import React from 'react';
import closeIcon from './icon/times-solid.svg';
import './task.css';


type TaskProps = {index: number, taskStatus: boolean, name: string, type: string, close: boolean, func_onUpdateTask: ((event: React.MouseEvent<HTMLElement>, index: number, close: boolean) => void)};
type TaskStates = {active: boolean};
class Task extends React.Component<TaskProps, TaskStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {active: this.props.taskStatus};
    }
    
    componentDidUpdate(prevProps: any)
    {
       if(this.props.taskStatus !== prevProps.taskStatus)
       {
            this.setState({active: this.props.taskStatus});
       }    
    }

    render()
    {
        return (

            <div className={"taskContainer " + this.state.active + " " + this.props.name} onClick={(event) => this.props.func_onUpdateTask(event, this.props.index, false)}>
                <div className={"standardizeWidth " + this.props.name}>
                    <h6 className={"taskLabel " + this.state.active}>{this.props.name}</h6>
                </div>
                <img className={this.props.close ? ("closeIcon " + this.state.active) : "hidden"} src={closeIcon} onClick={(event) => this.props.func_onUpdateTask(event, this.props.index, true)}></img>
            </div>
        );
    }
}

export default Task;