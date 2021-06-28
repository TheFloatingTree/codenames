import { createAction } from "@reduxjs/toolkit";

export const increment = createAction("game/inc")
export const redPoint = createAction("game/redPoint")
export const bluePoint = createAction("game/bluePoint")
export const bombPressed = createAction("game/bombPressed")
export const changeTurns = createAction("game/changeTurns")
export const resetGame = createAction("game/resetGame")

export const setClassic = createAction("game/setClassic")
export const setDuet = createAction("game/setDuet")
export const setUndercover = createAction("game/setUndercover")
