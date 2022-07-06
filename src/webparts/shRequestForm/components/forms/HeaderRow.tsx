import * as React from 'react';
interface IHeaderRowProps{
  text:any;
}

export default class HeaderRow extends React.Component<IHeaderRowProps,{}> {
  public render():JSX.Element{
    return (
      <div className='ms-Grid-row'>
        <div className="ms-Grid-col ms-sm12 ms-lg12 ms-formlabel">
          <h2 className='title'>{this.props.text}</h2>
        </div>
      </div>
    );
  }
}