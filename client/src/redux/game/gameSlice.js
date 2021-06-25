import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0,
    redScore: 9,
    blueScore: 8
}

export const makeGameSlice = () => createSlice({
    name: 'game',
    initialState,
    reducers: {
        inc: (state, action) => {
            state.count += action.payload
        },
        redPoint: (state) => {
            if(state.redScore > 0)
                state.redScore -= 1;
        },
        bluePoint: (state) => {
            if(state.blueScore > 0)
                state.blueScore -= 1;
        },
    }
})

export const gameSlice = makeGameSlice()