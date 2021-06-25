import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0,
    redScore: 9,
    blueScore: 8,
    turn: "red",
    gameWon: false,
    redWon: false,
    blueWon: false
}

export const makeGameSlice = () => createSlice({
    name: 'game',
    initialState,
    reducers: {
        inc: (state, action) => {
            state.count += action.payload
        },
        redPoint: (state) => {
            state.redScore -= 1;
            state.turn = "red";

            if(state.redScore === 0){
                state.redWon = true;
                state.gameWon = true;
            }
        },
        bluePoint: (state) => {
            state.blueScore -= 1;
            state.turn = "blue";

            if(state.blueScore === 0){
                state.blueWon = true;
                state.gameWon = true;
            }
        },
        bombPressed: (state) =>{
            state.gameWon = true;
            (state.turn === "red") ? (state.blueWon = true) : (state.redWon = true);
        },
        changeTurns: (state) =>{
            (state.turn === "red") ? (state.turn = "blue") : (state.turn = "red");
        }

    }
})

export const gameSlice = makeGameSlice()