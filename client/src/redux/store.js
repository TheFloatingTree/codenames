import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { gameSlice } from "./game/gameSlice";

function testMiddleware() {
    return (next) => {
        return (action) => {
            console.log(action)
            return next(action)
        }
    }
}

const rootReducer = combineReducers({
    game: gameSlice.reducer
})

export default configureStore({ reducer: rootReducer, middleware: [ testMiddleware ] })