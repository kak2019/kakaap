import * as React from 'react';
import {
    Label
} from 'office-ui-fabric-react/lib/Label';
// import HelpIcon from './HelpIcon';
import CustomToolTip from './CustomToolTip';
import { Tooltip } from 'office-ui-fabric-react/lib/Tooltip';
interface IFormLabelProps
{
    required?:any;
    tooltip?:any;
    label?:any;
}
export default class FormLabel extends React.Component<IFormLabelProps,{}> {
    
    public render():JSX.Element {
        const required = this.props.required;
        const tooltip = this.props.tooltip;
        return (
            <div className="ms-Grid-col ms-sm12 ms-lg3">
                <Label className="headerColumn" required={required}>{this.props.label}
                    {tooltip !== undefined && tooltip !== '' &&
                        // <HelpIcon tooltip = {tooltip} />
                        <CustomToolTip tooltip={tooltip}></CustomToolTip>
                    }
                </Label>

            </div>
        );
    }
}