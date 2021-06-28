import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0,
    redScore: 9,
    blueScore: 8,
    turn: "red",
    gameWon: false,
    redWon: false,
    blueWon: false,

    classicWords: true,
    duetWords: false,
    undercoverWords: false
}

export const makeGameSlice = () => createSlice({
    name: 'game',
    initialState,
    reducers: {
        inc: (state, action) => {
            state.count += action.payload
        },

        /* Game Actions */
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
        bombPressed: (state) => {
            state.gameWon = true;
            (state.turn === "red") ? state.blueWon = true : state.redWon = true;
        },
        changeTurns: (state) => {
            (state.turn === "red") ? state.turn = "blue" : state.turn = "red";
        },
        resetGame: (state) => {
            state.redScore = 9;
            state.blueScore = 8;
            state.turn = "red";
            state.gameWon = false;
            state.redWon = false;
            state.blueWon = false;
        },

        /* Word Lists */
        setClassic: (state => {
            (state.classicWords === true) ? state.classicWords = false : state.classicWords = true;
        }),
        setDuet: (state => {
            (state.duetWords === true) ? state.duetWords = false : state.duetWords = true;
        }),
        setUndercover: (state => {
            (state.undercoverWords === true) ? state.undercoverWords = false : state.undercoverWords = true;
        })

    }
})

export const gameSlice = makeGameSlice()