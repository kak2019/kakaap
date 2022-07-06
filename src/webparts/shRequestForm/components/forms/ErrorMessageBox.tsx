import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
interface IErrorMessageBoxProps{
    isOpen:any;
    warningTitle:any;
    warningDetails:any;
    closeModal:any;
    history:any;
    store:any;
}

export default class ErrorMessageBox extends React.Component<IErrorMessageBoxProps,{}> {
    
    public render():JSX.Element {
        const isOpen = this.props.isOpen;
        const warningTitle = this.props.warningTitle;
        const warningDetails = this.props.warningDetails;
        return (
            <Modal
                containerClassName = {'modal-container'}
                isOpen = {isOpen}
                isBlocking = {true}
                >
                <h4>{warningTitle}</h4>
                <div>{warningDetails}</div>
                <div>
                <DefaultButton
                    className='right-aligned'
                    text='Close'
                    onClick = {(e) => {
                        this.props.closeModal.bind(this.props.store)();
                        //this.props.history.push('', 'Overview');
                    }}
                    />
                </div>
            </Modal>
        );
    }
}

