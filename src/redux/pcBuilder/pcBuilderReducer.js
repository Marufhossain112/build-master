// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    selectedProduct: [],
    selectedCpu: null,
    selectedMotherboard: null,
    selectedRam: null,
    selectedPowerSupply: null,
    selectedStorageDevice: null,
    selectedMonitor: null,
    selectedOthers: null,
};
const pcBuilderSlice = createSlice({
    name: 'pcBuilder',
    initialState,
    reducers: {
        selectedProduct(state, action) {
            state.selectedProduct = [...state.selectedProduct, action.payload];
        },
        updateSelectedProduct(state, action) {
            const indexToRemove = action.payload;
            state.selectedProduct = state.selectedProduct.filter((_, index) => index !== indexToRemove);
        },
        selectedCpu(state, action) {
            state.selectedCpu = action.payload;
        },
        selectedMotherboard(state, action) {
            state.selectedMotherboard = action.payload;
        },
        selectedRam(state, action) {
            state.selectedRam = action.payload;
        },
        selectedPowerSupply(state, action) {
            state.selectedPowerSupply = action.payload;
        },
        selectedStorageDevice(state, action) {
            state.selectedStorageDevice = action.payload;
        },
        selectedMonitor(state, action) {
            state.selectedMonitor = action.payload;
        },
        selectedOthers(state, action) {
            state.selectedOthers = action.payload;
        },
    },
});
export const { selectedProduct, selectedCpu, selectedMotherboard, selectedRam, selectedPowerSupply, selectedStorageDevice, selectedMonitor, selectedOthers, updateSelectedProduct } = pcBuilderSlice.actions;
export default pcBuilderSlice.reducer;
