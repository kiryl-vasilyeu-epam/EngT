import { createSlice } from '@reduxjs/toolkit';

const changeModalVisibilityTo = (visible) => (state, { payload }) => {
  const { modalId, params } = payload;

  return state.map((modal) => {
    if (modal.id === modalId) {
      const { body: { classList } } = document;
      if (visible) {
        classList.add('modal-opened');
      } else {
        classList.remove('modal-opened');
      }

      return {
        ...modal,
        visible,
        params: params || null,
      };
    }

    return modal;
  });
};

const modalsControlSlice = createSlice({
  name: 'modal',
  initialState: [],
  reducers: {
    initModal: (state, { payload: id }) => [
      ...state,
      {
        id,
        visible: false,
        params: null,
      },
    ],
    showModal: changeModalVisibilityTo(true),
    hideModal: changeModalVisibilityTo(false),
  },
});

export const { initModal, showModal, hideModal } = modalsControlSlice.actions;
export default modalsControlSlice;
