import * as React from 'react';

import { sp,PrincipalType,PrincipalSource, IPrincipalInfo } from "@pnp/sp";
/* Kendo */
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
/* Mobx */
import { observer } from 'mobx-react';
interface IPeoplePickerProps{
    defaultValue?:any;
    defaultText?:any;
    onPersonSelected:any;
    onPersonDeselected:any;
    store:any;
}
interface IPeoplePickerState{
    preselectedItems:any;
    dataSource:any;
}

const PeoplePicker = observer(class PeoplePickerClass extends React.Component<IPeoplePickerProps,IPeoplePickerState> {
    constructor(props:IPeoplePickerProps) {
        super(props);
        this.state = {
            dataSource: [],
            preselectedItems: []
          };
    }


    public componentWillMount(){
        const defaultValue= this.props.defaultValue;
        const defaultText = this.props.defaultText;
        if (defaultValue && defaultText){
            this.setState({
                preselectedItems: [
                    {
                        key: defaultValue,
                        name: defaultText
                    }
                ]
            });
        }
    }


    public filterItems = (text): Promise<any> => {
        if (text ===''){
            // return {key: null, name: null} as  Promise<any>;
            return null;
        }
        return sp.utility.searchPrincipals(text,
            PrincipalType.User,
            PrincipalSource.All,
            "",
            20)
            .then((principals:IPrincipalInfo[] | any) => {
                return principals.SearchPrincipalsUsingContextWeb.results.reduce((filtered, principal)=>{
                    // if (principal.Email !== '' && principal.LoginName.indexOf("vcn") > 0){
                        filtered.push({
                            key: principal.LoginName,
                            name: `${principal.DisplayName} (${principal.JobTitle})`,
                            displayName: principal.DisplayName
                        });
                        
                   // }
                    return filtered as Promise<any>;
                },[]);
            });
    }

    
    public onPersonSelected = (input) => {
        if (input.length>0){
            const person = input[0];
            this.props.onPersonSelected.bind(this.props.store)({
                LoginName: person.key,
                DisplayName: person.displayName
            });
        }
        else {
            this.props.onPersonDeselected.bind(this.props.store)();
        }
    }


   public render():JSX.Element {
        return (
            <div>
                <TagPicker
                    itemLimit={1}
                    pickerSuggestionsProps = {
                        {
                            suggestionsHeaderText: 'People you may looking for',
                            noResultsFoundText: 'No people found'
                        }
                    }
                    onChange = {this.onPersonSelected}
                    onResolveSuggestions = {text => this.filterItems(text)}
                    defaultSelectedItems = {this.state.preselectedItems}
                />
            </div>
        );
    }
});

export default PeoplePicker;