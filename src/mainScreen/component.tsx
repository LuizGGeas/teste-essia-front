import React, { useEffect, useState } from "react";
import { getRootFolder, saveFolder, deleteFolder } from "../service/folderService.tsx";
import { saveFile, updateFile, deleteFile } from "../service/fileService.tsx";
import ListFolders from "../listFolders/component.tsx";
import Modal from "../modal/component.tsx"
import './style.css'

export interface FileElements {
    id?: number;
    name?: string;
    sourceFolder?: FolderElements | null;
    fileContent?: string;
}

export interface FolderElements {
    id?: number;
    name?: string;
    parentFolder?: FolderElements | null;
    subFolderList?: FolderElements[];
    fileList?: FileElements[];
}

export default function MainScreen() {
    const [firstFolder, setFirstFolder] = useState<FolderElements | null>();
    const [selectedFolder, setSelectedFolder] = useState<FolderElements | null>(null);
    const [selectedFile, setSelectedFile] = useState<FileElements | null>(null);
    const [createNewFile, setCreateNewFile] = useState(false);
    const [createNewFolder, setCreateNewFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [newFileName, setNewFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        initiateFolderList();
    }, []);

    async function initiateFolderList() {
        setLoading(true);
        setError("");
        try {
            const { data } = await getRootFolder();
            setFirstFolder(data);
        } catch (error) {
            setError("Failed to load folder list");
            console.error("Failed to load folder list", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSelectedFolder = (folder: FolderElements | null) => {
        setSelectedFolder(folder);
        setSelectedFile(null);
    };

    const handleSelectedFile = (file: FileElements) => {
        setSelectedFile(file);
    };

    const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value);
    };

    const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFileName(e.target.value);
    };

    const handleFileContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedFile({ ...selectedFile, fileContent: e.target.value });
    };

    const handleFolderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!newFolderName.trim()) {
            setError('Nome inválido')
            return;
        }

        if (!selectedFolder) {
            setError('Não foi selecionado uma pasta destino para a nova pasta');
            return;
        }

        setLoading(true);

        try {
            const folderData = {
                name: newFolderName,
                parentFolder: selectedFolder,
            };
            await saveFolder(folderData);
            setNewFolderName("");
            initiateFolderList();
            setCreateNewFolder(false);
        } catch (error) {
            setError(error.message);
            console.error("Falha ao criar nova pasta", error);
        } finally {
            setLoading(false);
        }
    };

    const updateFileContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!selectedFile)
            return;

        try {
            setSelectedFile(null);
            await updateFile({ ...selectedFile, sourceFolder: selectedFolder });
        } catch (error) {
            setError(error.message);
            console.error("Falha ao criar nova pasta", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!newFileName.trim()) {
            setError('Nome inválido')
            return;
        }

        if (!selectedFolder) {
            setError('Não foi selecionado uma pasta destino para a nova pasta');
            return;
        }

        setLoading(true);
        try {
            await saveFile({ name: newFileName, sourceFolder: selectedFolder });
            setNewFileName("");
            initiateFolderList();
            setCreateNewFile(false);
        } catch (error) {
            setError(error.message || "Unknown error");
            console.error("Failed to create file", error);
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = () => {
        setModalOpen(true);
    };

    const deleteItemSelected = async () => {
        setLoading(true);

        if(!selectedFolder)
            return;

        try {
            if(selectedFile) {
                return await deleteFile(selectedFile);
            }
            return await deleteFolder(selectedFolder);
        } catch (error) {
            setError(error.message || "Unknown error");
            console.error("Failed to create file", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="menu-button">
                {error && <p className="error-message">{error}</p>}
                {loading && <p>Loading...</p>}

                <div className="button-group">
                    {!createNewFolder && <button onClick={() => setCreateNewFolder(!createNewFolder)}>Criar nova pasta</button>}
                    {createNewFolder && (
                        <form onSubmit={handleFolderSubmit}>
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={handleFolderNameChange}
                                placeholder="Digite o nome da nova pasta"
                            />
                            <button type="submit">Criar nova pasta</button>
                        </form>
                    )}
                    {!createNewFile && <button onClick={() => setCreateNewFile(!createNewFile)}>Criar novo arquivo</button>}
                    {createNewFile && (
                        <form onSubmit={handleFileSubmit}>
                            <input
                                type="text"
                                value={newFileName}
                                onChange={handleFileNameChange}
                                placeholder="Digite o nome do novo arquivo"
                            />
                            <button type="submit">Criar novo arquivo</button>
                        </form>
                    )}
                    <button onClick={openDeleteModal}>Deletar item selecionado</button>
                </div>

                {selectedFile && <button className="update-button" onClick={updateFileContent}>Salvar arquivo</button>}
                <Modal
                    isOpen={isModalOpen}
                    message="Are you sure you want to delete this item?"
                    onClose={() => setModalOpen(false)}
                    onConfirm={deleteItemSelected}
                />
            </div>
            <div className="row">
                <div className="column">
                    <ul key={firstFolder?.id} className="no-bullet">
                        <li>
                            <ListFolders
                                item={firstFolder}
                                handleFolderSelected={handleSelectedFolder}
                                handleFileSelected={handleSelectedFile}
                                selectedFolder={selectedFolder}
                                selectedFile={selectedFile}
                            />
                        </li>
                    </ul>
                </div>
                <div className="column">
                    {selectedFile ? (
                        <textarea value={selectedFile.fileContent} onChange={handleFileContentChange} className="small-textarea" />
                    ) : (
                        <p>No file selected</p>
                    )}
                </div>
            </div>
        </>
    );
}