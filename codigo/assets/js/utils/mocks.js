import { getIdsFromLocalStorage, saveIdToLocalStorage } from "./localStorage";

export const mockIdsInLocalStorage = () => {
  if (!localStorage.getItem('ids')) {
    saveIdToLocalStorage(4, 2);
  }
};