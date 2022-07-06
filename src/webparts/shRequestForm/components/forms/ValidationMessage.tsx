import * as React from 'react';
interface IValidationMessageProps{
  dirty:any;
  message:any;
  condition:any;
}
export default class ValidationMessage extends React.Component<IValidationMessageProps,{}> {
  public render() :JSX.Element{
    const dirty=this.props.dirty;
    const message= this.props.message;
    const condition = this.props.condition === true;
    return (
        <span className="required">
        {condition && dirty && message
        }
        </span>
    );
  }
}