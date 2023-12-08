import create from 'zustand';

const useParentStore = create((set) => ({
  parentBio: [],
  setParentBio: (data) => set({ parentBio: data }),
}));

export default useParentStore;