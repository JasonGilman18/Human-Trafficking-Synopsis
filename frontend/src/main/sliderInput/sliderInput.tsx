import React from 'react';
import './sliderInput.css';


type SliderInputProps = {label: string, minVal: string, maxVal: string, step: string};
type SliderInputStates = {};
class SliderInput extends React.Component<SliderInputProps, SliderInputStates>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return(

            <div className="sliderInputContainer">
                <label className="sliderInputLabel" htmlFor="sliderInput">{this.props.label}</label>
                <input className="sliderInput" type="range" name="sliderInput" min={this.props.minVal} max={this.props.maxVal} step={this.props.step}></input>
            </div>
        );
    }
}

export default SliderInput;