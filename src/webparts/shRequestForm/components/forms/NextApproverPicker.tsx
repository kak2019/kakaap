// import * as React from 'react';
// import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
// import { Modal } from 'office-ui-fabric-react/lib/Modal';
// import PeoplePicker from './PeoplePicker';
// import FormRow from './FormRow';
// import ValidationMessage from './ValidationMessage';
// interface INextApproverPickerProps{
//     isOpen:any;
//     store:any;
//     approverCancelCallback:any;
//     approverSaveCallback:any;
// }
// interface INextApproverPickerState{
//     dirty:any;
// }

// class NextApproverPicker extends React.Component<INextApproverPickerProps,INextApproverPickerState> {
//     constructor(props:INextApproverPickerProps) {
//         super(props);

//         this.state = { dirty: false };
//     }

//    private makeDirty() {
//         this.setState({ dirty: true });
//     }

//   public  render() {
//         const isOpen = this.props.isOpen;
        
//         return (
//             <Modal
//                 containerClassName={'modal-container'}
//                 isOpen={isOpen}
//                 isBlocking={false}
//             >
//                 <h4>Please select next approver</h4>

//                 <div className='ms-Grid pad-left'>
//                     <FormRow label='Next approver' tooltip=''
//                         required={true}
//                         >
//                         <PeoplePicker
//                             store={this.props.store}
//                             onPersonDeselected={this.props.store.onApproverDeselected}
//                             onPersonSelected={this.props.store.onApproverSelected}
//                             defaultText={this.props.store.onApproverSelected}
//                             defaultValue={this.props.store.onApproverSelected}
//                         />
                        
//                         <ValidationMessage
//                             message='Approver is required'
//                             dirty={this.state.dirty}
//                             condition={this.props.store.nextApproverInvalid === true}
//                         />
//                     </FormRow>
                    
//                     <DefaultButton
//                         className='right-aligned'
//                         text='Cancel'
//                         onClick={(e) => {
//                             this.props.approverCancelCallback.bind(this.props.store)()
//                         }}
//                     />
//                     <DefaultButton
//                         className='right-aligned'
//                         text='Save'
//                         primary={true}
//                         onClick={(e) => {
//                             this.makeDirty();
//                             if (!this.props.store.nextApproverInvalid){
//                                 this.props.approverSaveCallback.bind(this.props.store)();
//                             }
//                         }}
//                     />
//                 </div>
//             </Modal>
//         );
//     }
// }

// export default NextApproverPicker;