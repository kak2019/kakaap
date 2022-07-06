import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

interface ISuccessConfirmationBoxProps{
    isOpen:any;
    message:any;
    redirectUrl:any;
    history:any;
}
class SuccessConfirmationBox extends React.Component<ISuccessConfirmationBoxProps,{}> {

    public render() :JSX.Element{
        const isOpen = this.props.isOpen; 
         const   message = this.props.message; 
         const   redirectUrl = this.props.redirectUrl; 
         const   history = this.props.history;

        return (
            <Modal
                containerClassName={'modal-container'}
                isOpen={isOpen}
                isBlocking={true}
            >
                <h4>All went well</h4>
                <MessageBar
                    messageBarType={MessageBarType.success}
                    isMultiline={false}
                >
                {message}   
                </MessageBar>
                <div>
               <DefaultButton
                    className='right-aligned'
                    text='OK'
                       primary={true}
                        onClick={(e) => {
                            history.push(redirectUrl);
                        }}
                    />
                </div>
            </Modal>
        );
    }
}

export default SuccessConfirmationBox;