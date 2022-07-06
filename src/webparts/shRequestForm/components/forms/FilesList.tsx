import * as React from 'react';

import { sp } from "@pnp/sp/presets/all";
import { Link } from 'office-ui-fabric-react/lib/Link';

interface IFilesListProps{
    libraryTitle:any;
    contentType:any;
    libraryPath:any;
    folder:any;
    onFilesLoaded?:any;
}
interface IFilesListState{
    files:any;
}
export default class FilesList extends React.Component<IFilesListProps,IFilesListState> {
    constructor(props:IFilesListProps) {
        super(props);
        this.state = {
            files: []
        };
    }

    public componentDidMount() {
        // Retrieving available content types
        sp.web.lists.getByTitle(this.props.libraryTitle).contentTypes.get()
            .then(result => {
                const ContentTypeId = result.filter((contenType) => {
                    return contenType.Name === this.props.contentType;
                })[0].StringId;

                const folderUrl = this.props.libraryPath + '/' + this.props.folder;
                sp.web.getFolderByServerRelativeUrl(folderUrl).files
                    .expand('ListItemAllFields')
                    .get()
                    .then(files => {
                        files = files.filter((file:any) => {
                            return file.ListItemAllFields.ContentTypeId === ContentTypeId;
                        });
                        this.setState({
                            files: files
                        });
                        if(this.props.onFilesLoaded){
                            this.props.onFilesLoaded(files);
                        }
                    });
            });
    }


   public render():JSX.Element {
        const fileItems = this.state.files.map((file, index) => {
            const fileName = file.Name;
            const fileUrl = file.ServerRelativeUrl;
            
            return (
                <div key={index}>
                    <Link href={fileUrl} target={'_blank'}>{fileName}</Link><br />
                </div>
            );
        });

        return (
            <div>
                {fileItems}
            </div>
        );
    }
}