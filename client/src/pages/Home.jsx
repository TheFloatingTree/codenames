import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Spacer, useColorMode } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'
import { Player } from '../shared/models'
import axios from 'axios'
import PlayerList from '../components/PlayerList'


export default function Home() {

    const { toggleColorMode } = useColorMode()
    const [tiles, setTiles] = useState([])

    useEffect(() => {
        axios.get('/api/get/words')
            .then(res => {
                const words = res.data
                setTiles(words)
            })
    }, [])

    return (
        <>
            <Flex>
                <Button onClick={ () => axios.post('/api/player/join', { gameId: "ckOeSs6Nh74c", player: new Player() }) } >Test Player Join</Button>
                <Spacer></Spacer>
                <Button variant="ghost" onClick={toggleColorMode}>
                    <SettingsIcon></SettingsIcon>
                </Button>
            </Flex>

            <Center><Box mb={3} fontSize={30}><b> <span>9</span> - <span>8</span> </b></Box></Center>
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
