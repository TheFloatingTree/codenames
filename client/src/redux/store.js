import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

function testMiddleware() {
    return (next) => {
        return (action) => {
            console.log(action)
            return next(action)
        }
    }
}


const rootReducer = combineReducers({

})

export default configureStore({ reducer: rootReducer, middleware: [ testMiddleware ] })