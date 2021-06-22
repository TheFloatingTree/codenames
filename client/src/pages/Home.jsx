import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Spacer, useColorMode, Text, Switch } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'
import { Player } from '../shared/models'
import axios from 'axios'

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

            <Center>
                <Box w="1000px" mb="1">
                    <Flex>
                        <Box w="200px"> <Text fontSize="30px" as="b"> 9 - 8 </Text> </Box> <Spacer />
                        <Box> <Text colorScheme="teal" fontSize="30px" as="b" > Blue's Turn </Text></Box> <Spacer />
                        <Box w="200px" textAlign="right"> <Button w="100px" colorScheme="blue" > End Turn </Button> </Box>
                    </Flex>
                </Box>
            </Center>

            <Center>
                <Grid templateColumns="repeat(5, 1fr)" gap="3">
                    {tiles.map((tile, index) => {
                        return <GameTile delay={index * 3} type={tile.type} word={tile.word} key={tile.word}></GameTile>
                    })}
                </Grid>
            </Center>

            <Center>
                <Box w="1000px" mt="2">
                    <Flex>
                        <Box w="200px">
                            <Text fontSize="18px" as="b"> Spymaster </Text> <Switch size='lg'></Switch>
                        </Box>
                        <Spacer />
                        <Box w="400px" textAlign="right"> 
                            <Button colorScheme="yellow"> New Game </Button>
                        </Box>
                    </Flex>
                </Box>
            </Center>
      
        </>
    )
}
