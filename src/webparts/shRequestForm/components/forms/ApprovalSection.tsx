import * as React from 'react';


import { sp } from "@pnp/sp";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { observer } from 'mobx-react';

import { CONST } from '../../../../config/const';
import ValidationMessage from './ValidationMessage';
import SuccessConfirmationBox from './SuccessConfirmationBox';


interface IApprovalSectionProps{
    id:any;
    user:any;
    store:any;
}
interface IApprovalSectionState{
    closedTasks:any;
    closedTasksRead:boolean;
    taskStatus:any;
    nextApprover:any;
  }
  
const ApprovalSection = observer(class ApprovalSectionClass extends React.Component<IApprovalSectionProps,IApprovalSectionState> {
    constructor(props:IApprovalSectionProps) {
        super(props);
        this.state = {
            closedTasks: [],
            closedTasksRead: false,
            taskStatus:'',
            nextApprover:'',
      };      
    }

    public componentDidMount() {
        // Get approval history
        sp.web.lists.getByTitle(CONST.listName).items.getById(this.props.id)
            .select('am_approvalLog','am_approvalHistory','am_status','am_nextApprover/Title', 'am_nextApprover/Name')
            .expand('am_nextApprover')
            .get()
            .then(result => {
                if (result.am_approvalHistory == null && result.am_approvalLog !== null) {
                    let object = JSON.parse(result.am_approvalLog);
                    this.setState({
                        closedTasks: object,
                        closedTasksRead: true,
                    });
                }
                if (result.am_approvalHistory !== null) {
                    let object = JSON.parse(result.am_approvalHistory);
                    this.setState({
                        closedTasks: object,
                        closedTasksRead: true,
                    });
                }
                this.setState({
                    taskStatus:result.am_status,
                    nextApprover:result.am_nextApprover.Title,
                });
            }).catch(error => {
                        console.warn(error);
                    });
    }

    public render() {

         const closedTasks = this.state.closedTasks.map((task, index) => {
            if(task.date){
            let modified = new Date(task.date);

            return (
                <div className='table-approval-tasks' key={index}>
                    <div className='ms-Grid-row pad-top'>
                        <div className='ms-Grid-col ms-sm3'>
                            Assigned to:
                            <br />
                            {task.stage}
                        </div>
                        <div className='ms-Grid-col ms-sm2'>
                            Date:
                            <br />
                            {modified.toLocaleDateString()}
                        </div>
                        <div className='ms-Grid-col ms-sm3'>
                            Outcome:
                            <br />
                            {task.decision} by {task.approver}
                        </div>
                        <div className='ms-Grid-col ms-sm4'>
                            Comments:
                            <br />
                            {task.comments}
                        </div>
                    </div>
                </div>
            );
        }
        if(task.Modified){
            let modified = new Date(task.Modified);

            return (
                <div className='table-approval-tasks' key={index}>
                    <div className='ms-Grid-row pad-top'>
                        <div className='ms-Grid-col ms-sm3'>
                            Assigned to:
                            <br />
                            {task.AssignedTo}
                        </div>
                        <div className='ms-Grid-col ms-sm2'>
                            Date:
                            <br />
                            {modified.toLocaleDateString()}
                        </div>
                        <div className='ms-Grid-col ms-sm3'>
                            Outcome:
                            <br />
                            {task.TaskOutcome} by {task.Editor}
                        </div>
                        <div className='ms-Grid-col ms-sm4'>
                            Comments:
                            <br />
                            {task.Comments}
                        </div>
                    </div>
                </div>
            );
        }
        });

        return (
            <div>
            <div className="table-approvers">
                <h3 className="headerColumn">Approvals</h3>
                {this.state.closedTasks.length>0 ?
                closedTasks : <div className="ms-formlabel">No approval history found</div>}
            </div>
            {
                (this.state.taskStatus=="Sent for approval" || this.state.taskStatus=="Draft") &&
             <div className="table-approvers">
             <h3 className="headerColumn">Next Approver</h3>
             <div className="ms-formlabel">{this.state.nextApprover}</div>
             </div>
           }
            </div>
        );
    }
});

export default ApprovalSection;