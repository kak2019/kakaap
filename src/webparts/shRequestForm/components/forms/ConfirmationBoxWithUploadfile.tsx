import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Upload } from '@progress/kendo-upload-react-wrapper';
interface IConfirmationBoxProps{
    isOpen:any;
    confirmationDetails:any;
    confirmationNoCallback:any;
    //confirmationNoCallbackWithUpload:any,
    confirmationYesCallback:any;
    store:any;
}

class ConfirmationBoxWithUpload extends React.Component<IConfirmationBoxProps,{isDisabled: boolean}> {

    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true
        };
    }

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
                <div id="CloseRequest">
            <Upload
              select={(event) => {
                console.log(event);
                if(event.files.length > 0) {
                    this.setState({
                        isDisabled: false
                    });
                }
                this.props.store.onSignedAgreementAdded(event);
                }}
              remove={(event) => {
                if(event.files.length > 0) {
                    this.setState({
                        isDisabled: true
                    });
                }
                this.props.store.onSignedAgreementRemoved(event);
            }}
            />
          </div>
                <DefaultButton
                        className='right-aligned'
                        text='Cancel'
                        onClick={(e) => {
                            this.props.confirmationNoCallback.bind(this.props.store)();
                            //alert("2")
                            //this.props.store.isConfirmationWithUpload=false
                        }}
                    />
                    <DefaultButton
                        disabled={this.state.isDisabled}
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