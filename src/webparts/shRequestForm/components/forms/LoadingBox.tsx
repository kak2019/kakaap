import * as React from 'react';
import {
    Spinner,
    SpinnerSize
  } from 'office-ui-fabric-react/lib/Spinner';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
interface ILoadingBoxProps{
    isOpen:any;
    infoDetails:any;
}

export default class LoadingBox extends React.Component<ILoadingBoxProps,{}> {
    
    public render():JSX.Element {
        const isOpen = this.props.isOpen;
        const infoDetails = this.props.infoDetails;
        return (
            <Modal
                containerClassName = {'modal-container'}
                isOpen = {isOpen}
                isBlocking = {true}
                >
                <h4>Please wait ... </h4>
                <div>
                <Spinner 
                    size={ SpinnerSize.large } 
                    label={infoDetails} 
                    ariaLive='assertive' />
                </div>
            </Modal>
        );
    }
}
