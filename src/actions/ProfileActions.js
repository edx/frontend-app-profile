import AsyncActionType from './AsyncActionType';

export const FIELD_OPEN = 'FIELD_OPEN';
export const FIELD_CLOSE = 'FIELD_CLOSE';
export const FETCH_PROFILE = new AsyncActionType('PROFILE', 'FETCH_PROFILE');
export const SAVE_PROFILE = new AsyncActionType('PROFILE', 'SAVE_PROFILE');
export const SAVE_PROFILE_PHOTO = new AsyncActionType('PROFILE', 'SAVE_PROFILE_PHOTO');
export const DELETE_PROFILE_PHOTO = new AsyncActionType('PROFILE', 'DELETE_PROFILE_PHOTO');
export const UPDATE_DRAFTS = 'UPDATE_DRAFTS';
export const RECEIVE_PREFERENCES = 'RECEIVE_PREFERENCES';


export const openField = fieldName => ({
  type: FIELD_OPEN,
  fieldName,
});

export const closeField = fieldName => ({
  type: FIELD_CLOSE,
  fieldName,
});

export const updateDrafts = drafts => ({
  type: UPDATE_DRAFTS,
  drafts,
});

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE.BEGIN,
});

export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE.SUCCESS,
  profile,
});

export const receivePreferences = preferences => ({
  type: RECEIVE_PREFERENCES,
  preferences,
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE.FAILURE,
  payload: { error },
});

export const fetchProfileReset = () => ({
  type: FETCH_PROFILE.RESET,
});

export const fetchProfile = username => ({
  type: FETCH_PROFILE.BASE,
  payload: { username },
});

export const saveProfileBegin = () => ({
  type: SAVE_PROFILE.BEGIN,
});

export const saveProfileSuccess = () => ({
  type: SAVE_PROFILE.SUCCESS,
});

export const saveProfileReset = () => ({
  type: SAVE_PROFILE.RESET,
});

export const saveProfileFailure = error => ({
  type: SAVE_PROFILE.FAILURE,
  payload: { error },
});

export const saveProfile = (username, { profileData, preferencesData }, fieldName) => ({
  type: SAVE_PROFILE.BASE,
  payload: {
    fieldName,
    username,
    profileData,
    preferencesData,
  },
});

export const saveProfilePhotoBegin = () => ({
  type: SAVE_PROFILE_PHOTO.BEGIN,
});

export const saveProfilePhotoSuccess = () => ({
  type: SAVE_PROFILE_PHOTO.SUCCESS,
});

export const saveProfilePhotoReset = () => ({
  type: SAVE_PROFILE_PHOTO.RESET,
});

export const saveProfilePhotoFailure = error => ({
  type: SAVE_PROFILE_PHOTO.FAILURE,
  payload: { error },
});

export const saveProfilePhoto = (username, formData) => ({
  type: SAVE_PROFILE_PHOTO.BASE,
  payload: {
    username,
    formData,
  },
});

export const deleteProfilePhotoBegin = () => ({
  type: DELETE_PROFILE_PHOTO.BEGIN,
});

export const deleteProfilePhotoSuccess = () => ({
  type: DELETE_PROFILE_PHOTO.SUCCESS,
});

export const deleteProfilePhotoReset = () => ({
  type: DELETE_PROFILE_PHOTO.RESET,
});

export const deleteProfilePhotoFailure = error => ({
  type: DELETE_PROFILE_PHOTO.FAILURE,
  payload: { error },
});

export const deleteProfilePhoto = username => ({
  type: DELETE_PROFILE_PHOTO.BASE,
  payload: {
    username,
  },
});