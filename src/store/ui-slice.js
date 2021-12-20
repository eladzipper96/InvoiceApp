import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        IsMobile: window.screen.width < 500,
        showEmptyInvoices: true,
        showEditInvoice: false,
        showInvoicePreview: false,
        pageIndex: 1
    },
    reducers: {
        setEmptyInvoices(state, action) {
            state.showEmptyInvoices = action.payload
        },
        setEditInvoice(state, action) {
            state.showEditInvoice = action.payload
        }
    }
})
export const uiActions = uiSlice.actions
export default uiSlice;