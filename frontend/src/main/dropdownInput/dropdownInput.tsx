import React from 'react';
import './dropdownInput.css';


type DropDownInputProps = {label: string, values: Array<string>, inputName: string, func_handleFormInput: ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, input: string) => void)};
type DropDownInputStates = {};
class DropDownInput extends React.Component<DropDownInputProps, DropDownInputStates>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return (

            <div className="dropdownInputContainer">
                <label className="dropdownInputLabel" htmlFor="dropdownInput">{this.props.label}</label>
                <select className="dropdownInput" name="dropdownInput" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.props.func_handleFormInput(e, this.props.inputName)}>
                    {
                        this.props.values.map((value) => (
                            
                            <option className="dropdownOptions" value={value}>{value}</option>
                        ))
                    }
                </select>
            </div>          
        )
    }
}

export default DropDownInput;