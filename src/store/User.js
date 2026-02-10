import { create } from "zustand";

const useProfile = create((set) => ({
  userData: null,
  notes: "",
  inputData: "",
  jobs: null,
  setInputData: (input) => set((state) => ({ inputData: input })),
  setData: (data) => set((state) => ({ userData: data })),
  setNotes: (ytNotes) => set((state) => ({ notes: ytNotes })),
  setJobs: (job) => set((state) => ({ jobs: job })),
}));
export default useProfile;
