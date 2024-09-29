import axios from "axios";
import { FileElements } from "../mainScreen/component";

const url = 'http://localhost:8080'

export function updateFile(file: FileElements) {
    try {
        return axios.put(`${url}/file/${file.id}`, file);
    } catch(e){
        console.error(e.error)
    }
}

export function saveFile(file: FileElements) {
    try {
        return axios.post(`${url}/file`, file);
    } catch(e){
        console.error(e.error)
    }
}

export function deleteFile(file: FileElements) {
    try {
        return axios.delete(`${url}/file/${file.id}`);
    } catch(e){
        console.error(e.error)
    }
}