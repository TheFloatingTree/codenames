import React from 'react'
import { Center, useMediaQuery } from "@chakra-ui/react"

export default function GameTile() {

    const [desktop] = useMediaQuery("(min-width: 481px)")

    const boxSize = desktop ? { w: "160px", h: "120px" } : { w: "80px", h: "60px" }

    return (
        <Center w={ boxSize.w } h={ boxSize.h } boxShadow="outline" borderRadius="md">
            Testing
        </Center>
    )
}
