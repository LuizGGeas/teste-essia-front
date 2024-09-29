import axios from "axios";
import { FolderElements } from "../mainScreen/component";

const url = 'http://localhost:8080'

export function getFolderList() {
    try {
        return axios.get<FolderElements[]>(`${url}/folder`);
    } catch(e){
        console.error(e.error)
    } 
}

export function getRootFolder() {
    try {
        return axios.get<FolderElements[]>(`${url}/folder/root`);
    } catch(e){
        console.error(e.error)
    } 
}

export function updateFolder(folder: FolderElements) {
    try {
        return axios.put(`${url}/folder/${folder.id}`, folder);
    } catch(e){
        console.error(e.error)
    }
}

export function saveFolder(folder: FolderElements) {
    try {
        return axios.post(`${url}/folder`, folder);
    } catch(e){
        console.error(e.error)
    }
}

export function deleteFolder(folder: FolderElements) {
    try {
        return axios.delete(`${url}/folder/${folder.id}`);
    } catch(e){
        console.error(e.error)
    }
}