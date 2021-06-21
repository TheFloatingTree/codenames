import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0
}

export const makeGameSlice = () => createSlice({
    name: 'game',
    initialState,
    reducers: {
        inc: (state, action) => {
            state.count += action.payload
        }
    }
})

export const gameSlice = makeGameSlice()