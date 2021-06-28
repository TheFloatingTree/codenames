// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Spacer, useColorMode, Text, useColorModeValue, Switch, VStack, Divider } from "@chakra-ui/react"
import { SettingsIcon, AddIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'
import { Player } from '../shared/models'
import axios from 'axios'
import PlayerList from '../components/PlayerList'
import { useSelector, useDispatch  } from 'react-redux'
import { changeTurns, resetGame, setClassic, setDuet, setUndercover } from '../redux/game/gameActions'

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
    
    const classicWords = useSelector(state => state.game.classicWords)
    const duetWords = useSelector(state => state.game.duetWords)
    const undercoverWords = useSelector(state => state.game.undercoverWords)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/api/get/words')
            .then(res => {
                const words = res.data
                setTiles(words)
            })
    }, [])

    const newGame = () => {
        dispatch(resetGame());

        axios.get('/api/get/words')
        .then(res => {
            const words = res.data
            setTiles(words)
        })
    }

    const spymasterOn = (event) => {
        // setTiles(tiles.map((tile) =>{
        //     tile.word = "";            
        //     return tile;
        // }));
    }

    /* Renders "[Team]'s Turn" and "[Team] Wins!" */
    const renderTopText = () => {
        if(gameWon)
            return <Text color={(redWon) ? redColor : blueColor} fontSize="30px" as="b">{redWon ? "Red Wins!" : "Blue Wins!"}</Text>
    
        else
            return <Text color={(turn === "red") ? redColor : blueColor} fontSize="30px" as="b">{(turn === "red") ? "Red's Turn" : "Blue's Turn"}</Text>
        
    }

    

    let redplayers = ["Tree", "Llama", "Ander", "Loller"];
    let blueplayers = ["Aem", "Blue", "Pieckomode", "Trooper"];

    let colorScheme = "";
    (turn === "red") ? colorScheme = "red" : colorScheme = "blue";

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
                <Grid templateRows="2fr 1fr">
                    <PlayerList redplayers={redplayers} blueplayers={blueplayers} redColor={redColor} blueColor={blueColor} greyColor={greyColor}/>
                    <Box>
                        <VStack spacing="15px">
                            <Button w={300} h={50} onClick={() => dispatch(setClassic())} colorScheme={(classicWords) ? "yellow" : "gray"}> 
                                Classic Words 
                            </Button>
                            <Button w={300} h={50} onClick={() => dispatch(setDuet())} colorScheme={(duetWords) ? "yellow" : "gray"}>
                                Duet Words
                            </Button>
                            <Button w={300} h={50} onClick={() => dispatch(setUndercover())} colorScheme={(undercoverWords) ? "yellow" : "gray"}>
                                Undercover Words
                            </Button>
                            <Button w={300} h={50} variant="outline" rightIcon={<AddIcon />}>
                                Add Custom Words
                            </Button>
                        </VStack>
                    </Box>
                </Grid>

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
                            <Button colorScheme="yellow" onClick={newGame}> New Game </Button>
                        </Box>
                    </Flex>
                </Box>
            </Center>
      
        </>
    )
}
