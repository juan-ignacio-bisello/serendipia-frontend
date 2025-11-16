import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isItemModalOpen: false,
        isSideBarOpen: false,
        isCartWidgetEmpty: true,
        isActiveEvent: false,
        selectedProduct: null,
        counter: 0
    },
    reducers: {
        onItemModalHandler: ( state ) => {
            state.isItemModalOpen = !state.isItemModalOpen;
        },
        onSideBarOpenHandler: ( state ) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },
        setSelectedProduct: ( state, { payload } ) => {
            state.selectedProduct = payload;
        },
        clearSelectedProduct: ( state ) => {
            state.selectedProduct = null;
        },
        increment: ( state ) => {
            state.counter += 1;
            if ( state.counter >= 1 ) {
                state.isCartWidgetEmpty = false;
            }
        },
        decrement: ( state ) => {
            if ( state.counter === 0 ) {
                state.isCartWidgetEmpty = true;
                return;
            }
            state.counter -= 1;
            
        },
        reset: ( state ) => {
            state.counter = 0;
            state.isCartWidgetEmpty = true;
            state.isActiveEvent = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onItemModalHandler, onSideBarOpenHandler, setSelectedProduct, clearSelectedProduct, increment, decrement, reset } = uiSlice.actions;