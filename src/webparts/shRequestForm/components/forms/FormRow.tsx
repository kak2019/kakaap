import * as React from 'react';
import FormLabel from './FormLabel';
interface Props
{
    required?:any;
    tooltip?:any;
    label?:any;
}
export default class FormRow extends React.Component<Props> {
    public render():JSX.Element{

    return (
      <div className='ms-Grid-row pad-top row-delimited'>
        <FormLabel {...this.props} />
        <div className="ms-Grid-col ms-sm12 ms-lg9">
            {this.props.children}
        </div>
      </div>
    );
  }
}