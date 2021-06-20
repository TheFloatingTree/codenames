import React, { useEffect, useState } from 'react'
import { Center, ScaleFade, useColorModeValue, useMediaQuery } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { TILE_BLUE_TEAM, TILE_BOMB, TILE_NO_TEAM, TILE_RED_TEAM } from '../shared/constants'

const MotionCenter = motion(Center)

const boxColors = {
    [TILE_NO_TEAM]: ["blackAlpha.200", "whiteAlpha.200"],
    [TILE_RED_TEAM]: ["red.300", "red.600"],
    [TILE_BLUE_TEAM]: ["blue.300", "blue.600"],
    [TILE_BOMB]: ["blackAlpha.600", "blackAlpha.900"],
}

export default function GameTile({ word, delay, type }) {

    const [shouldAppear, setShouldAppear] = useState(false)
    const [typeHidden, setTypeHidden] = useState(true)

    const [desktop] = useMediaQuery("(min-width: 769px)")
    const lightMode = useColorModeValue(true, false)

    const boxSize = desktop ? { w: "200px", h: "160px" } : { w: "80px", h: "60px" }
    const boxColor = typeHidden ? boxColors[TILE_NO_TEAM][+!lightMode] : boxColors[type][+!lightMode]


    useEffect(() => {
        const timer = setTimeout(() => setShouldAppear(true), delay)
        return () => clearTimeout(timer)
    }, [])

    return (
        <ScaleFade in={shouldAppear} initialScale={0.5}>
            <MotionCenter
                onClick={() => setTypeHidden(false)}
                w={boxSize.w}
                h={boxSize.h}
                _hover={{ cursor: "pointer" }}
                backgroundColor={boxColor}
                border="3px"
                borderColor="blue.500"
                borderRadius="md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}>
                <div style={{
                    userSelect: "none",
                    textTransform: "uppercase",
                    hyphens: "auto",
                    margin: "1em",
                    fontWeight: "bold"
                }}>{word}</div>
            </MotionCenter>
        </ScaleFade>
    )
}
