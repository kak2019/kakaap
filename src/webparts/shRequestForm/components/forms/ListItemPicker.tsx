import * as React from 'react';
import * as PropTypes from 'prop-types';
import { sp } from "@pnp/sp/presets/all";
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { CONST }  from '../../../../config/const';
import helpers from '../../../../config/Helpers';

interface IListItemPickerProps{
       // fields: any;
      //  onChange: any;    
        resolveDelay: any; 
        aadClient:any;
        onSelected:any;
        onDeselected:any;
        store:any;
        defaultValue?:any;
}
interface IListItemPickerState{
    preselectedItems:any;
    
}

export default class ListItemPicker extends React.Component<IListItemPickerProps,IListItemPickerState>{
    private static propTypes = {
        
        fields: PropTypes.object.isRequired,
        
        onChange: PropTypes.func.isRequired,
       
        resolveDelay: PropTypes.number,    
    };
    constructor(props:IListItemPickerProps) {
        super(props);
        this.state = {
            preselectedItems: []
          };
    }
    private getParmaDataInfo(parmaNum): Promise<any>{
        try {
            
        
        const apiUri:string=`${CONST.azureFunctionBaseUrl}/api/getparma/?q=${encodeURIComponent(parmaNum)}`;
       return helpers.getResponseFromAzureFunction(apiUri,this.props.aadClient).then(response => {
            if(response.length>0)
                {
                    let r = response.map(item => (
                                            {
                                                key: item,
                                                name: item,
                                                extra: item
                                            }
                                        ));
                        
                                        return r as Promise<any>;
                }
        });
    } catch (error) {
           console.log(error); 
    }
  }
public componentWillMount(){
    const defaultValue= this.props.defaultValue;
    if (defaultValue){
        this.setState({
            preselectedItems: [
                {
                    key: defaultValue,
                    name: defaultValue,
                    extra: defaultValue
                }
            ]
        });
    }
}
 public onSelected(e) {
     if(e.length>0)
    {var dataItem = e[0].key;
    var parmaURLValue = `${CONST.azureFunctionBaseUrl}/api/getparma/${dataItem}`;
    return helpers.getResponseFromAzureFunction(parmaURLValue,this.props.aadClient)
    // .then(response => {
    //     return response.json();
    // })
    .then(data => {
            this.props.onSelected.bind(this.props.store)(data);
     });
    }
    else {
        this.props.onDeselected.bind(this.props.store)();
    }
}
    
    public render(): React.ReactElement {
        return (<div>
            <TagPicker
                onResolveSuggestions={text => this.getParmaDataInfo(text)}
                itemLimit={1}
                resolveDelay={this.props.resolveDelay || 0}
                onChange={this.onSelected.bind(this)}//{item => this.props.onSelected(item)}
                pickerSuggestionsProps={{
                    suggestionsHeaderText: 'Displaying top 10 results. Type more for better filtering',
                    noResultsFoundText: 'Nothing Found',
                    resultsMaximumNumber: 10
                }}
                defaultSelectedItems = {this.state.preselectedItems}
            />
        </div>
        );
    }
}