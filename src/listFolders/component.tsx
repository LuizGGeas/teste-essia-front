import React from "react";
import { FolderElements } from "../mainScreen/component";

interface Props {
    item: FolderElements;
}

export default function ListFolders({ item }: Props ) {
    return (
        <>  
            <h3>{item.name}</h3>
            {(item.subFolderList || []).map(newItem => <a><ListFolders item={newItem}></ListFolders></a>)}
        </>
    );
}