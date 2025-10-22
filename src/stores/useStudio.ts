import { create } from 'zustand';

interface useStudioState {
  index: number;
  dataList: any;
  imgSrc: string;
  jsonSrc: string;
  jsonData: any;
  segmentation: any;
  doneList: any;
  setDoneList: (doneList: any) => void;
  setIndex: (index: number) => void;
  setSegmentation: (segmentation: any) => void;
  setDataList: (dataList: any) => void;
  setImgSrc: (imgSrc: string) => void;
  setJsonSrc: (jsonSrc: string) => void;
  setJsonData: (jsonData: any) => void;
}

const useStudio = create<useStudioState>((set) => ({
  index: 0,
  dataList: null,
  imgSrc: '',
  jsonSrc: '',
  jsonData: null,
  segmentation: null,
  doneList: null,
  setDoneList: (doneList) => set({ doneList }),
  setIndex: (index) => set({ index }),
  setSegmentation: (segmentation) => set({ segmentation }),
  setDataList: (dataList) => set({ dataList }),
  setImgSrc: (imgSrc) => set({ imgSrc }),
  setJsonSrc: (jsonSrc) => set({ jsonSrc }),
  setJsonData: (jsonData) => set({ jsonData }),
}));

export default useStudio;
