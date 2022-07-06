import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

/* Mobx */
import { observer } from 'mobx-react';
interface ICheckboxWithTextFieldProps{
    checked:any;
    checkboxName:any;
    textfieldName:any;
    store:any;
}
const CheckboxWithTextField = observer(class CheckboxWithTextFieldClass extends React.Component<ICheckboxWithTextFieldProps,{}> {
    public render():JSX.Element {
        return (
            <div className='ms-Grid-row pad-top'>
                <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                    <Checkbox checked={this.props.checked}
                        onChange={(event, isChecked) => this.props.store[this.props.checkboxName] = isChecked} 
                    />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                    {this.props.store[this.props.checkboxName] === true &&
                    <TextField 
                        required={true}
                        onChanged={(value)=> this.props.store[this.props.textfieldName] = value}
                        value={this.props.store[this.props.textfieldName]}
                    />
                    }
                </div>
            </div>
        );
    }
});

export default CheckboxWithTextField;