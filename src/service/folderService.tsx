import axios, { AxiosResponse } from "axios";
import { FolderElements } from "../mainScreen/component";

const url = 'http://localhost:8080'

export function getFolderList() {
    try {
        return axios.get<FolderElements[]>(`${url}/folder`);
    } catch(e){
        console.error(e.error)
    }
    // return getMockData();
}

function getMockData(): FolderElements[] {
    return [
        {
            id: 1,
            name: 'a',
            parentFolder: null,
            subFolderList: [
                {
                    id: 2,
                    name: 'b',
                    parentFolder: {
                        id: 1,
                        name: 'a',
                    },
                    subFolderList: [
                        {
                            id: 4,
                            name: 'd',
                            parentFolder: {
                                id: 2,
                                name: 'b',
                            }
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'c',
                    parentFolder: {
                        id: 1,
                        name: 'a',
                    }
                }
            ]
        }
    ]
}