import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
interface ICheckboxGroupProps{
    options:any;
}
export default class CheckboxGroup extends React.Component<ICheckboxGroupProps,{}> {

    public render():JSX.Element {
        const checkboxes = this.props.options.map((option,index) => 
            <div className='pad-top' key={index}>
                <Checkbox label={option.text} 
                    onChange={(event:any, isChecked) => {
                        console.log(event);
                        console.log(event.label);
                    }}
                />
            </div>
        );
        return (
            <div className='scroll-box'>
                {checkboxes}
            </div>
        );
    }
}