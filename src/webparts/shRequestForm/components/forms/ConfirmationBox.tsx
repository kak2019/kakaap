import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
interface IConfirmationBoxProps{
    isOpen:any;
    confirmationDetails:any;
    confirmationNoCallback:any;
    confirmationYesCallback:any;
    store:any;
}

class ConfirmationBox extends React.Component<IConfirmationBoxProps,{}> {

    public render():JSX.Element {
        const isOpen = this.props.isOpen;
        
        const confirmationDetails = this.props.confirmationDetails;
        return (
            <Modal
                containerClassName={'modal-container'}
                isOpen={isOpen}
                isBlocking={true}
            >
                <h4>Please confirm</h4>
                <div>{confirmationDetails}</div>
                <div>
                <DefaultButton
                        className='right-aligned'
                        text='No'
                        onClick={(e) => {
                            this.props.confirmationNoCallback.bind(this.props.store)();
                        }}
                    />
                    <DefaultButton
                        className='right-aligned'
                        text='Yes'
                        primary={true}
                        onClick={(e) => {
                            this.props.confirmationYesCallback.bind(this.props.store)();
                        }}
                    />
                </div>
            </Modal>
        );
    }
}

export default ConfirmationBox;