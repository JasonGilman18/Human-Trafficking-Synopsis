import React from 'react';
import './textInput.css';

type TextInputProps = {label: string, placeholder1: string, placeholder2: string, inputNames: Array<string>, func_handleFormInput: ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, input: string) => void)};
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
                    <input className="textInput" type="number" min="0" max="100" name="textInput" placeholder={this.props.placeholder1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.func_handleFormInput(e, this.props.inputNames[0])}></input>
                    <h5 className="toLabel">To</h5>
                    <input className="textInput" type="number" min="0" max="100" placeholder={this.props.placeholder2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.func_handleFormInput(e, this.props.inputNames[1])}></input>
                </div>
            </div>
        );
    }
}

export default TextInput;