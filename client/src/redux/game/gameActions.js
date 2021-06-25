import { createAction } from "@reduxjs/toolkit";

export const increment = createAction("game/inc")
export const redPoint = createAction("game/redPoint")
export const bluePoint = createAction("game/bluePoint")
export const bombPressed = createAction("game/bombPressed")
export const changeTurns = createAction("game/changeTurns")