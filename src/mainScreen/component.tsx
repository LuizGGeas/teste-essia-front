import React, { useEffect, useState } from "react";
import { getFolderList } from "../service/folderService.tsx";
import ListFolders from "../listFolders/component.tsx";

export interface FolderElements {
    id: number;
    name: string;
    parentFolder?: FolderElements | null;
    subFolderList?: FolderElements[];
    
}

export default function MainScreen() {
    const [elements , setElements] = useState<FolderElements[]>([]);

    useEffect(() => {
        initateFolderList();
    }, []);

    async function initateFolderList () {
        const { data } = await getFolderList();
        setElements(data);
    }


    
    return (
        elements.map(item => <ListFolders item={item}></ListFolders>)
    );
}