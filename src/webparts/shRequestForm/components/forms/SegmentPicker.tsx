import * as React from 'react';

import { sp } from "@pnp/sp/presets/all";

/* Kendo */
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css';
import { MultiSelect } from '@progress/kendo-dropdowns-react-wrapper';

/* Mobx */
import { observer } from 'mobx-react';


const dataSource = new kendo.data.DataSource({
    transport: {
        read: (e)=> {
            sp.web.lists.getByTitle("Taxonomy").items.top(5000).get()
            .then((result) => {
                e.success(result);
            });
        }
    }
});
interface ISegmentPickerProps{
    onSelected:any;
    onDeselected:any;
    store:any;
    defaultValue:any;
}
const SegmentPicker = observer(class SegmentPickerClass extends React.Component<ISegmentPickerProps,{}> {
    // public handleSelectedChange(e:any){
    //     this.props.store(e.dataItem.am_cd_x002d_Desc);
    // }
    // public handleDeSelectedChange(e:any){
    //     this.props.store();
    // }
    constructor(props:ISegmentPickerProps) {
        super(props);
       // this.handleSelectedChange =(e)=>this.props.onSelected.bind(this.props.store);
       // this.handleDeSelectedChange = (e)=>this.props.onDeselected.bind(this.props.store);
    }

   public render():JSX.Element {
        return (
            <MultiSelect
                dataTextField={'am_cd_x002d_Desc'}
                dataValueField={'am_cd_x002d_Desc'}
                filter={'startswith'}
                dataSource={dataSource}
                minLength={1}
                maxSelectedItems={1}
                select={(e) => { 
                    this.props.onSelected.bind(this.props.store)(e.dataItem.am_cd_x002d_Desc);
                }}
                deselect={(e) => {
                    this.props.onDeselected.bind(this.props.store)();
                }}
                value={[this.props.defaultValue]}
            />
            // <MultiSelect
            //     dataTextField={'am_cd_x002d_Desc'}
            //     dataValueField={'am_cd_x002d_Desc'}
            //     filter={'startswith'}
            //     dataSource={dataSource}
            //     minLength={1}
            //     maxSelectedItems={1}
            //     select={(e)=>{this.handleSelectedChange}}
            //     deselect={(e)=>this.handleDeSelectedChange}
            //     value={[this.props.defaultValue]}
            // />
        );
    }
});

export default SegmentPicker;