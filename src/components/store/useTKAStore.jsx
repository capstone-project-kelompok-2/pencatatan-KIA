import create from 'zustand';

const useTKAStore = create((set) => ({
  TKAData: [],
  setTKAData: (data) => set({ TKAData: data }),
}));

export default useTKAStore;