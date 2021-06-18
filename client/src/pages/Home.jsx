import React, { useEffect, useState } from 'react'
import { Button, Center, Flex, Grid, Spacer, useColorMode } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'

export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode()
    const [words, setWords] = useState([])

    useEffect(() => {
        fetch('/api/get/words')
            .then(res => res.json())
            .then(setWords)
    }, [])

    return (
        <>
            <Flex>
                <Spacer></Spacer>
                <Button variant="ghost" onClick={toggleColorMode}>
                    <SettingsIcon></SettingsIcon>
                </Button>
            </Flex>
            <Center>
                <Grid templateColumns="repeat(5, 1fr)" gap="3">
                    {words.map((word, index) => {
                        return <GameTile delay={index * 3} word={word} key={word}></GameTile>
                    })}
                </Grid>
            </Center>
        </>
    )
}
