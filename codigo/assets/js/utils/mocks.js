import { getIdsFromLocalStorage, saveIdToLocalStorage } from "./localStorage.js";

export const mockIdsInLocalStorage = () => {
  if (!localStorage.getItem('ids')) {
    saveIdToLocalStorage(4, 2);
  }
};