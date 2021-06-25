// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Spacer, useColorMode, Text, useColorModeValue, Switch } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'
import { Player } from '../shared/models'
import axios from 'axios'
import PlayerList from '../components/PlayerList'
import { useSelector, useDispatch  } from 'react-redux'
import { changeTurns } from '../redux/game/gameActions'

export default function Home() {

    const { toggleColorMode } = useColorMode()
    const [tiles, setTiles] = useState([])
    const redColor = useColorModeValue("red.500", "red.300")
    const blueColor = useColorModeValue("blue.500", "blue.400")
    const greyColor = useColorModeValue("gray.200", "gray.700")

    const redScore = useSelector(state => state.game.redScore)
    const blueScore = useSelector(state => state.game.blueScore)
    const gameWon = useSelector(state => state.game.gameWon)
    const redWon = useSelector(state => state.game.redWon)
    const turn = useSelector(state => state.game.turn);
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/api/get/words')
            .then(res => {
                const words = res.data
                setTiles(words)
            })
    }, [])

    const spymasterOn = (event) => {
        // console.log(event);
        // setTiles(tiles.map((tile) =>{
            
        //     return tile;
        // }));
    }

    /* Renders "[Team]'s Turn" and "[Team] Wins!" */
    const renderTopText = () => {
        if(gameWon)
            return <Text color={(redWon)?(redColor):(blueColor)} fontSize="30px" as="b">{(redWon)?("Red Wins!"):("Blue Wins!")}</Text>
    
        else
            return <Text color={(turn === "red")?(redColor):(blueColor)} fontSize="30px" as="b">{(turn === "red")?("Red's Turn"):("Blue's Turn")}</Text>
        
    }

    let redplayers = ["Tree", "Llama", "Ander", "Lollifurry"];
    let blueplayers = ["Aem", "Blue", "Bruhnilla", "Trooper"];

    let colorScheme = "";
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
                                <Text color={redColor}>{redScore} </Text>
                                <Text>&nbsp;-&nbsp;</Text>
                                <Text color={blueColor}>{blueScore}</Text>
                            </Flex>
                        </Box>  <Spacer />
                        <Box> 
                            {renderTopText()}
                        </Box>  <Spacer />
                        <Box w="200px" textAlign="right"> 
                            <Button w="100px" colorScheme={colorScheme} onClick={() => dispatch(changeTurns())}> End Turn </Button> 
                        </Box>
                    </Flex>
                </Box>
            </Center>

            <Grid templateColumns="1fr 2fr 1fr">
                {/* LEFT SIDEBAR */}
                <PlayerList redplayers={redplayers} blueplayers={blueplayers} redColor={redColor} blueColor={blueColor} greyColor={greyColor}/>

                {/* GAME BOARD */}
                <Center>
                    <Grid templateColumns="repeat(5, 1fr)" gap="3">
                        {tiles.map((tile, index) => {
                            return <GameTile delay={index * 3} type={tile.type} word={tile.word} key={tile.word}></GameTile>
                        })}
                    </Grid>
                </Center>
            </Grid>
                
            {/* FOOTER */}
            <Center>
                <Box w="1000px" mt="2">
                    <Flex>
                        <Box w="200px">
                            <Text fontSize="18px" as="b"> Spymaster </Text> 
                            {/* <Button onClick={spymasterOn}>SPYMASTER ON</Button> */}
                            <Switch size='lg' colorScheme="teal"  onChange={(event) => spymasterOn(event.target.value)}></Switch>
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
