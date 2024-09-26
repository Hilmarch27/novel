import {create} from "zustand";

interface GlobalState {
  data: string | null; // Define the type of your data
  setData: (data: string | null) => void; // Function to set the data
}

const useGlobalStore = create<GlobalState>((set) => ({
  data: null, // Initial value
  setData: (data) => set({ data: data }), // Function to update the data
}));

export default useGlobalStore;
