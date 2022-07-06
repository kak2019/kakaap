import * as React from 'react';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
// import './CalloutExample.scss';


interface ICustomToolTipProps
{
    tooltip:any;
}
export interface ICalloutDirectionalExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
  { key: DirectionalHint.topCenter, text: 'Top Center' },
  { key: DirectionalHint.topRightEdge, text: 'Top Right Edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top Auto Edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom Left Edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom Center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom Right Edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom Auto Edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left Top Edge' },
  { key: DirectionalHint.leftCenter, text: 'Left Center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left Bottom Edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right Top Edge' },
  { key: DirectionalHint.rightCenter, text: 'Right Center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' }
];

export default class CustomToolTip extends React.Component<ICustomToolTipProps, ICalloutDirectionalExampleState> {
  private _menuButtonElement: HTMLElement | null;

  public constructor(props: ICustomToolTipProps) {
    super(props);

    this.state = {
      isCalloutVisible: false,
      isBeakVisible: true,
      directionalHint: DirectionalHint.bottomLeftEdge
    };
  }

  public render(): JSX.Element {
    const { isCalloutVisible, isBeakVisible, directionalHint, gapSpace, beakWidth } = this.state;
    //  ms-Callout-smallbeak is used in this directional example to reflect all the positions.
    //  Large beak will disable some position to avoid beak over the callout edge.
    return (
        <div className='navbar-right ms-CustomRenderExample-labelIconArea' ref={menuButton => (this._menuButtonElement = menuButton)}>
          <IconButton
            onClick={this._onShowMenuClicked}
            iconProps={{ iconName: 'Info' }}
          />
        {isCalloutVisible ? (
          <Callout
            className="ms-CalloutExample-callout"
            target={this._menuButtonElement}
            onDismiss={this._onCalloutDismiss}
            role={'alertDialog'}
            gapSpace={0}
          >
            <h4 className='ms-CalloutExample-title pad-left pad-right'>
                   {this.props.tooltip}
            </h4>
          </Callout>
        ) : null}
      </div>
    );
  }

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  }

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

}


