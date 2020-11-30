import React, { ChangeEvent } from 'react';
import './sliderInput.css';


type SliderInputProps = {label: string, minVal: string, maxVal: string, step: string};
type SliderInputStates = {value: string};
class SliderInput extends React.Component<SliderInputProps, SliderInputStates>
{
    constructor(props: any)
    {
        super(props);
        this.state = {value: "50"};
    }

    render()
    {
        return(

            <div className="sliderInputContainer">
                <label className="sliderInputLabel" htmlFor="sliderInput">{this.props.label + ": " + this.state.value + " y/o"}</label>
                <input className="sliderInput" type="range" name="sliderInput" min={this.props.minVal} max={this.props.maxVal} step={this.props.step} value={this.state.value} onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({value: e.currentTarget.value})}></input>
            </div>
        );
    }
}

export default SliderInput;