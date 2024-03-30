import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const PutDataSlice = createSlice({
    name: 'PutDataSliceName',
    initialState: {
        getData: [],
        isDataInserted: null,
        isDataDeleted: null,
        isDataEdited: null,
    },
    reducers: {
        clearIsDataInsertedState: (state) => {
            state.isDataInserted = null;
        },
        clearIsDataDeletedState: (state) => {
            state.isDataDeleted = null;
        },
        clearIsDataEditedState: (state) => {
            state.isDataEdited = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(PutDataThunk.fulfilled, (state, action) => {
                state.isDataInserted = action.payload;
            })
            .addCase(GetDataThunk.fulfilled, (state, action) => {
                state.getData = action.payload;
            })
            .addCase(DeleteDataThunk.fulfilled, (state, action) => {
                state.isDataDeleted = action.payload;
            })
            .addCase(EditDataThunk.fulfilled, (state, action) => {
                state.isDataEdited = action.payload;
            })
    }
})

export const { clearIsDataInsertedState, clearIsDataDeletedState, clearIsDataEditedState } = PutDataSlice.actions;
export const PutDataReducer = PutDataSlice.reducer;
export const isDataInsertedTemp = state => state.PutDataSliceName.isDataInserted;
export const getDataTemp = state => state.PutDataSliceName.getData;
export const isDataDeletedTemp = state => state.PutDataSliceName.isDataDeleted;
export const isDataEditedTemp = state => state.PutDataSliceName.isDataEdited;

export const PutDataThunk = createAsyncThunk(
    'PutDataSliceName/PutdataThunk',
    async (passedData) => {
        try {
            const res = await fetch('http://localhost/todolist/server/index.php?action=putData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passedData),
            })
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('error : ', error);
        }
    }
)

export const GetDataThunk = createAsyncThunk(
    'PutDataSliceName/GetDataThunk',
    async (whatStatus) => {
        try {
            const res = await fetch('http://localhost/todolist/server/index.php?action=getData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(whatStatus),
            })
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('error : ', error);
        }
    }
)

export const DeleteDataThunk = createAsyncThunk(
    'PutDataSliceName/DeleteDataThunk',
    async (ID) => {
        try {
            const res = await fetch('http://localhost/todolist/server/index.php?action=deleteData', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(ID),
            })
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('error : ', error);
        }
    }
)

export const EditDataThunk = createAsyncThunk(
    'PutDataSliceName/EditDataThunk',
    async (passedData) => {
        try {
            const res = await fetch('http://localhost/todolist/server/index.php?action=editData', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(passedData),
            })
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('error : ', error);
        }
    }
)