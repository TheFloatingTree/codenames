import React, { useEffect, useState } from 'react'
import { Button, Center, Flex, Grid, Spacer, useColorMode } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'
import { TILE_BLUE_TEAM, TILE_BOMB, TILE_NO_TEAM, TILE_RED_TEAM } from '../constants'

const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
};

export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode()
    const [tiles, setTiles] = useState([])

    useEffect(() => {
        fetch('/api/get/words')
            .then(res => res.json())
            .then(words => {
                setTiles(words.map(word => {
                    return {
                        word,
                        type: randomChoice([ TILE_NO_TEAM, TILE_RED_TEAM, TILE_BLUE_TEAM, TILE_BOMB ])
                    }
                }))
            })
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
                    {tiles.map((tile, index) => {
                        return <GameTile delay={index * 3} type={tile.type} word={tile.word} key={tile.word}></GameTile>
                    })}
                </Grid>
            </Center>
        </>
    )
}
