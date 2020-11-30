import React from 'react';
import './checkboxInput.css';


type checkboxInputProps = {label: string, values: Array<string>, inputNames: Array<string>, func_handleFormInput: ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, input: string) => void)};
type checkboxInputStates = {values: Array<string>};
class CheckBoxInput extends React.Component<checkboxInputProps, checkboxInputStates>
{
    constructor(props: any)
    {
        super(props);

        this.state = {values: this.props.values};
    }

    changeValue(i: number)
    {
        var temp_values = this.state.values;
        if(temp_values[i] == "")
        {
            temp_values[i] = this.props.values[i];
        }
        else
        {
            temp_values[i] = "";
        }

        this.setState({values: temp_values});
    }

    render()
    {
        return (

            <div className="checkboxInputContainer">
                <label className="checkboxInputLabel" htmlFor="checkboxInput">{this.props.label}</label>
                <form name="checkboxInput">
                    {
                        this.props.values.map((value, index) => (
                            
                            <div className="inputLabelCombo">
                                <input className="checkbox" type="checkbox" name={"" + index} value={this.state.values[index]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.props.func_handleFormInput(e, this.props.inputNames[index]); this.changeValue(index)}}></input>
                                <label className="checkboxLabel" htmlFor={"" + value}>{value}</label>
                            </div>
                        ))
                    }
                </form>
            </div>
        );
    }
}

export default CheckBoxInput;