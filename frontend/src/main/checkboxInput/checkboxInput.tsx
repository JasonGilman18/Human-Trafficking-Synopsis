import React from 'react';
import './checkboxInput.css';


type checkboxInputProps = {label: string, values: Array<string>};
type checkboxInputStates = {};
class CheckBoxInput extends React.Component<checkboxInputProps, checkboxInputStates>
{
    constructor(props: any)
    {
        super(props);
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
                                <input className="checkbox" type="checkbox" name={"" + index} value={"" + value}></input>
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