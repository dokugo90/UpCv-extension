import { createSlice } from "@reduxjs/toolkit";


const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        prompt: "Write me a short cover letter based on the provided job description",
        name: ""
    },
    reducers: {
        setPrompt(state, action) {
            state.prompt = action.payload;
        },

        setName(state, action) {
            state.name = action.payload
        }
    }
})

export const { setPrompt, setName } = settingsSlice.actions;
export default settingsSlice.reducer;