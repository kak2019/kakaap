import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Upload } from '@progress/kendo-upload-react-wrapper';
interface IConfirmationBoxProps{
    isOpen:any;
    confirmationDetails:any;
    confirmationNoCallback:any;
    confirmationYesCallback:any;
    store:any;
}

class ConfirmationBoxWithUpload extends React.Component<IConfirmationBoxProps,{}> {

    public render():JSX.Element {
        const isOpen = this.props.isOpen;
        
        const confirmationDetails = this.props.confirmationDetails;
        return (
            <Modal
                containerClassName={'modal-container'}
                isOpen={isOpen}
                isBlocking={true}
            >
                {/* <h4>Please confirm11</h4> */}
                <div>{confirmationDetails}</div>
                <div>
                <div id="SignedAgreements">
            <Upload
              select={(event) => this.props.store.onSignedAgreementAdded(event)}
              remove={(event) => this.props.store.onSignedAgreementRemoved(event)}
            />
          </div>
                <DefaultButton
                        className='right-aligned'
                        text='Cancel'
                        onClick={(e) => {
                            this.props.confirmationNoCallback.bind(this.props.store)();
                        }}
                    />
                    <DefaultButton
                        className='right-aligned'
                        text='Close Request'
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

export default ConfirmationBoxWithUpload;