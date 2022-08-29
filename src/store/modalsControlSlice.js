import { createSlice } from '@reduxjs/toolkit';

const changeModalVisibilityTo = (visible) => (state, { payload: id }) => state.map((modal) => {
  if (modal.id === id) {
    const { body: { classList } } = document;
    if (visible) {
      classList.add('modal-opened');
    } else {
      classList.remove('modal-opened');
    }

    return {
      ...modal,
      visible,
    };
  }

  return modal;
});

const modalsControlSlice = createSlice({
  name: 'modal',
  initialState: [],
  reducers: {
    initModal: (state, { payload: id }) => [
      ...state,
      {
        id,
        visible: false,
      },
    ],
    showModal: changeModalVisibilityTo(true),
    hideModal: changeModalVisibilityTo(false),
  },
});

export const { initModal, showModal, hideModal } = modalsControlSlice.actions;
export default modalsControlSlice;
