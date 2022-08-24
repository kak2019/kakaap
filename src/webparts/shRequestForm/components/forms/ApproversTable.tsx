import * as React from 'react';

import { Link } from 'office-ui-fabric-react/lib/Link';
interface IApproversTableProps {
    decisionType: any;
    level: any;
    approvers: any;
    pdRepresentative: any;
}

class ApproversTable extends React.Component<IApproversTableProps, {}> {

    public render(): JSX.Element {
        const type = this.props.decisionType;
        const level = this.props.level;
        const approvers = this.props.approvers;
        const pdRepresentative = this.props.pdRepresentative;

        const authorities = ['Manager', 'Vice President', 'Senior Vice President', 'Executive Vice President'];
        const approversDisplay = [];

        function getApprover(minAuthorityIndex: number) {
            for (let i = minAuthorityIndex; i < approvers.length; i++) {
                if (approvers[i]) {
                    return {
                        authorityIndex: i,
                        approver: approvers[i]
                    };
                }
            }

            return null;
        }

        let workflowMinAuthorityIndex = authorities.indexOf(level);

        if (workflowMinAuthorityIndex === -1 && level !== 'Agreement Controller') {
            workflowMinAuthorityIndex = 0; //Manager
        }

        if (workflowMinAuthorityIndex !== -1) {
            let currentAuthorityIndex = -1;

            do {
                const approver = getApprover(currentAuthorityIndex + 1);
                if (approver !== null) {
                    if(!approver.approver.IsBuyer){
                        approversDisplay.push(approver);
                    }
                    
                    currentAuthorityIndex = approver.authorityIndex;
                } else {
                    break; //prevents infinite loop if there is no high enough authority
                }
            } while (currentAuthorityIndex < workflowMinAuthorityIndex);
        }

        return (
            <div className="table-approvers">
                <h3 className="headerColumn">Approvers Chain</h3>
                <div className='ms-Grid-row pad-top'>
                    <div className="ms-Grid-col ms-sm3 ms-formlabel">
                    Agreement Controller
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-formlabel">
                    <Link href='mailto:Group.agreementcontroller@udtrucks.se'>Application PAM - Partner Agreement Management</Link>
                    </div>
                </div>

                {type === 'Development' && pdRepresentative !== '' &&       //pdRepresentative will be blank for 'Sourcing Decision'
                <div className='ms-Grid-row pad-top'>
                    <div className="ms-Grid-col ms-sm3 ms-formlabel">
                    Product Development
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-formlabel">
                    {pdRepresentative}
                    </div>
                    </div>
                }

                {
                    approversDisplay.map(a => {
                        return (
                            <div key={a.authorityIndex} className='ms-Grid-row pad-top'>
                     <div className="ms-Grid-col ms-sm3 ms-formlabel">
                                    {authorities[a.authorityIndex]}
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-formlabel">
                                    {a.approver.Name}
                    </div>
                </div>
                        );
                    })
                }

                {level === 'Sourcing Controller'
                    &&
                    <div className='ms-Grid-row pad-top'>
                    <div className="ms-Grid-col ms-sm3 ms-formlabel">
                    Sourcing Controller
                    </div>
                    <div className="ms-Grid-col ms-sm9 ms-formlabel">
                    <Link href='mailto:group.agreementcontroller@udtrucks.se'> Application PAM - Partner Agreement Management</Link>
                    </div>
                    </div>
                }

          </div>
        );
    }
}

export default ApproversTable;