import React from 'react';
import './textInput.css';

type TextInputProps = {label: string, placeholder: string};
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
                <input className="textInput" type="text" name="textInput" placeholder={this.props.placeholder}></input>
            </div>
        );
    }
}

export default TextInput;