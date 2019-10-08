import { STORE_RECENT_BOARDS } from 'consts';

export const getRecentBoards = () => {
  return JSON.parse(localStorage.getItem(STORE_RECENT_BOARDS)) || [];
};

export const addToRecentBoards = (id) => {
  const boards = getRecentBoards();
  const updated = [...new Set([id, ...boards])].slice(0, 3);
  localStorage.setItem(STORE_RECENT_BOARDS, JSON.stringify(updated));
};
