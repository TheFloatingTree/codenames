import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Spacer, useColorMode, Text, Switch, useColorModeValue } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'
import { Player } from '../shared/models'
import axios from 'axios'

export default function Home() {

    const { toggleColorMode } = useColorMode()
    const [tiles, setTiles] = useState([])
    const [turn, setTurn] = useState("red");
    const redColor = useColorModeValue("red.500", "red.300")
    const blueColor = useColorModeValue("blue.600", "blue.400")

    useEffect(() => {
        axios.get('/api/get/words')
            .then(res => {
                const words = res.data
                setTiles(words)
            })
    }, [])

    // const spymasterOn = () => {
    //     setTiles(tiles.map((tile) =>{
    //         console.log(tile);
    //         return tile;
    //     }));
    // }

    let currentTurn = "";
    let colorScheme = "";
    (turn === "red")?(currentTurn = "Red's Turn"):(currentTurn = "Blue's Turn");
    (turn === "red")?(colorScheme = "red"):(colorScheme = "blue");

    return (
        <>
            {/* SETTINGS */}
            <Flex>
                <Button onClick={ () => axios.post('/api/player/join', { gameId: "ckOeSs6Nh74c", player: new Player() }) } >Test Player Join</Button>
                <Spacer></Spacer>
                <Button variant="ghost" onClick={toggleColorMode}>
                    <SettingsIcon></SettingsIcon>
                </Button>
            </Flex>

            {/* HEADER */}
            <Center>
                <Box w="1000px" mb="1">
                    <Flex>
                        <Box w="200px" fontSize="30px" as="b"> 
                            <Flex>
                                <Text color={redColor}>9</Text>
                                <Text>&nbsp;-&nbsp;</Text>
                                <Text color={blueColor}>8</Text>
                            </Flex>
                        </Box>  <Spacer />
                        <Box> 
                            <Text color={(turn === "red")?(redColor):(blueColor)} fontSize="30px" as="b" > {currentTurn}</Text>
                        </Box>  <Spacer />
                        <Box w="200px" textAlign="right"> 
                            <Button w="100px" colorScheme={colorScheme} onClick={() => setTurn((turn === "red")?("blue"):("red"))}> End Turn </Button> 
                        </Box>
                    </Flex>
                </Box>
            </Center>

            {/* GAME BOARD */}
            <Center>
                <Grid templateColumns="repeat(5, 1fr)" gap="3">
                    {tiles.map((tile, index) => {
                        return <GameTile delay={index * 3} type={tile.type} word={tile.word} key={tile.word}></GameTile>
                    })}
                </Grid>
            </Center>
                
            {/* FOOTER */}
            <Center>
                <Box w="1000px" mt="2">
                    <Flex>
                        <Box w="200px">
                            <Text fontSize="18px" as="b"> Spymaster </Text> 
                            {/* <Button onClick={spymasterOn}>SPYMASTER ON</Button> */}
                            <Switch size='lg' colorScheme="teal"></Switch>
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
