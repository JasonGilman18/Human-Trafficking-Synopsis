import React from 'react';
import './textInput.css';

type TextInputProps = {label: string, placeholder1: string, placeholder2: string};
type TextInputStates = {};
class TextInput extends React.Component<TextInputProps, TextInputStates>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return(

            <div className="textInputContainer">
                <label className="textInputLabel" htmlFor="textInput">{this.props.label}</label>
                <div className="centerToLabel">
                    <input className="textInput" type="number" min="0" max="100" name="textInput" placeholder={this.props.placeholder1}></input>
                    <h5 className="toLabel">To</h5>
                    <input className="textInput" type="number" min="0" max="100" placeholder={this.props.placeholder2}></input>
                </div>
            </div>
        );
    }
}

export default TextInput;