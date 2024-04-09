import {create} from "zustand";

interface BoardStore {
    title: string;
    content: string;
    writerNickname: string;
    boardImageFileList: File[];
    titleImage: string;
    setTitle: (title:string) => void;
    setContent: (content:string) => void;
    setWriterNickname: (writerNickname:string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    setTitleImage: (titleImage:string) => void;
    resetBoard: () => void;
};

const useBoardStore = create<BoardStore>(set => ({
    title: '',
    content: '',
    writerNickname:'',
    boardImageFileList: [],
    titleImage:'',
    setTitle: (title) => set(state => ({...state,title})),
    setContent: (content: any) => set(state => ({...state,content})),
    setWriterNickname: (writerNickname) => set(state=> ({...state,writerNickname})),
    setBoardImageFileList: (boardImageFileList) => set(state =>({...state, boardImageFileList})),
    setTitleImage: (titleImage) => set(state => ({...state,titleImage})),
    resetBoard: () =>set(state => ({...state, title: '',content:'' , writerNickname:'',boardImageFileList:[],titleImage:''})),
}));

export default useBoardStore;