import {create} from "zustand";

interface BoardStore {
    title: string;
    content: string;
    writerNickname: string;
    boardImageFileList: File[];
    setTitle: (title:string) => void;
    setContent: (content:string) => void;
    setWriterNickname: (writerNickname:string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
};

const useBoardStore = create<BoardStore>(set => ({
    title: '',
    content: '',
    writerNickname:'',
    boardImageFileList: [],
    setTitle: (title) => set(state => ({...state,title})),
    setContent: (content: any) => set(state => ({...state,content})),
    setWriterNickname: (writerNickname) => set(state=> ({...state,writerNickname})),
    setBoardImageFileList: (boardImageFileList) => set(state =>({...state, boardImageFileList})),
    resetBoard: () =>set(state => ({...state, title: '',content:'' , writerNickname:'',boardImageFileList:[]})),
}));

export default useBoardStore;