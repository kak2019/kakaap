// import React from 'react';
// import PropTypes from 'prop-types';
// import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
// import { Modal } from 'office-ui-fabric-react/lib/Modal';
// import PeoplePicker from './PeoplePicker';
// import FormRow from './FormRow';
// import ValidationMessage from './ValidationMessage';


// class ReassignmentPicker extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = { dirty: false };
//     }

//     makeDirty() {
//         this.setState({ dirty: true });
//     }

//     render() {
//         const isOpen = this.props.isOpen;

//         return (
//             <Modal
//                 containerClassName={'modal-container'}
//                 isOpen={isOpen}
//                 isBlocking={false}
//             >
//                 <h4>Approver Reassignment</h4>

//                 <div className='ms-Grid pad-left'>
//                     <FormRow label='Next approver'
//                         required={true}
//                     >
//                         <PeoplePicker
//                             store={this.props.store}
//                             onPersonDeselected={this.props.store.onApproverDeselected}
//                             onPersonSelected={this.props.store.onApproverSelected}
//                         />
//                         in place of {this.props.currentApprover}

//                         <ValidationMessage
//                             message='Next Approver is required'
//                             dirty={this.state.dirty}
//                             condition={this.props.store.nextApproverInvalid === true}
//                         />
//                     </FormRow>

//                     <DefaultButton
//                         className='right-aligned'
//                         text='Cancel'
//                         onClick={(e) => {
//                             this.props.cancelCallback.bind(this.props.store)()
//                         }}
//                     />
//                     <DefaultButton
//                         className='right-aligned'
//                         text='Save'
//                         primary={true}
//                         onClick={(e) => {
//                             this.makeDirty();
//                             if (!this.props.store.nextApproverInvalid) {
//                                 this.props.saveCallback.bind(this.props.store)(this.props.taskId, this.props.itemId, this.props.history)
//                             }
//                         }}
//                     />
//                 </div>
//             </Modal>
//         )
//     }
// }

// ReassignmentPicker.propTypes = {
//     isOpen: PropTypes.bool,
//     store: PropTypes.object.isRequired,
//     currentApprover: PropTypes.string,
//     taskId: PropTypes.number.isRequired,
//     itemId: PropTypes.number.isRequired,
//     history: PropTypes.object.isRequired,
//     cancelCallback: PropTypes.func,
//     saveCallback: PropTypes.func
// }

// export default ReassignmentPicker;