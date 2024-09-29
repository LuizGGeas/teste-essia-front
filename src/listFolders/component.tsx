import React, { useState } from "react";
import { FileElements, FolderElements } from "../mainScreen/component";
import './style.css'

interface Props {
    item: FolderElements | null | undefined;
    handleFolderSelected: (folder: FolderElements) => void;
    handleFileSelected: (file: FileElements) => void;
    selectedFolder: FolderElements | null;
    selectedFile: FileElements | null;
}

export default function ListFolders({ item, handleFolderSelected, handleFileSelected, selectedFolder, selectedFile }: Props) {
    const [showFolderContent, setShowFolderContent] = useState(false);

    const isSelectedFolder = selectedFolder && selectedFolder.id === item?.id;

    return (
        <>
            <h3 
                className={isSelectedFolder ? 'selected' : ''}
                onClick={() => {
                    setShowFolderContent(!showFolderContent); 
                    handleFolderSelected(item);
                }}
            >
                {item?.name}
            </h3>

            {}
            {showFolderContent && (
                <ul className="no-bullet">
                    {item?.subFolderList?.map((subFolder) => (
                        <li key={subFolder.id}>
                            <ListFolders 
                                item={subFolder} 
                                handleFolderSelected={handleFolderSelected}
                                handleFileSelected={handleFileSelected}
                                selectedFolder={selectedFolder}
                                selectedFile={selectedFile}
                            />
                        </li>
                    ))}
                    {item?.fileList?.map((file) => (
                        <li 
                            key={file.id}
                            className={selectedFile?.id === file.id ? 'selected-file' : ''}
                            onClick={() => handleFileSelected(file)}
                        >
                            {file.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}