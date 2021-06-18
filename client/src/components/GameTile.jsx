import React, { useEffect, useState } from 'react'
import { Center, ScaleFade, useColorModeValue, useMediaQuery } from "@chakra-ui/react"
import { motion } from 'framer-motion'

const MotionCenter = motion(Center)

export default function GameTile({ word, delay }) {

    const [shouldAppear, setShouldAppear] = useState(false)

    const [desktop] = useMediaQuery("(min-width: 769px)")
    const lightMode = useColorModeValue(true, false)

    const boxSize = desktop ? { w: "160px", h: "120px" } : { w: "80px", h: "60px" }
    const boxColor = lightMode ? "blackAlpha.200" : "blackAlpha.700"


    useEffect(() => {
        const timer = setTimeout(() => setShouldAppear(true), delay)
        return () => clearTimeout(timer)
    }, [])

    return (
        <ScaleFade in={shouldAppear} initialScale={0.5}>
            <MotionCenter w={boxSize.w} h={boxSize.h} _hover={{ cursor: "pointer" }} backgroundColor={boxColor} border="3px" borderColor="blue.500" borderRadius="md" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                <div style={{ userSelect: "none" }}>{word}</div>
            </MotionCenter>
        </ScaleFade>
    )
}
