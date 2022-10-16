import { useEffect, useReducer } from 'react';
import { database } from '../configs/firebase';

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
};

// root folder
const ROOT_FOLDER = {
  name: 'Root',
  id: null,
  path: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      // reset all to default state
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    default:
      return state;
  }
};

export const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    // default state
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  // whenever our folder id or folder changes, reset all to default state
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    // if there is no folderId, then its a root folder
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    // if there is folderId, show folder by its folderId
    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  return state;
};
