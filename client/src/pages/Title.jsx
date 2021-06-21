// @ts-nocheck
import React, { useState } from 'react'
import { Button, Center, Flex, Grid, Heading, Input, Spacer, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../redux/game/gameActions'


export default function Title() {
  const { colorMode, toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [password, setPassword] = useState('')

  const count = useSelector(state => state.game.count)
  const dispatch = useDispatch()

  return (
    <>
      <Flex>
        <Button onClick={ () => dispatch(increment(5)) }>
          {count}
        </Button>
        <Spacer></Spacer>
        <Button variant="ghost" onClick={toggleColorMode}>
          <SettingsIcon></SettingsIcon>
        </Button>
      </Flex>
      <Flex height="90vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={formBackground} p={12} rounded={6} w={400}>
          <Heading mb={6} textAlign="center">Codenames</Heading>
          <Input placeholder="Screen Name" varient="filled" mb={3} type="text" onChange={(event) => setName(event.target.value)}/>
          <Input placeholder="Room Name" varient="filled" mb={3} type="text" onChange={(event) => setRoom(event.target.value)}/>
          <Input placeholder="Room Password" varient="filled" mb={3} type="text" onChange={(event) => setPassword(event.target.value)}/>

          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/game/${room.toLowerCase()}`}>
            <Button colorScheme="green" mt={5} w={304}>Create New Game</Button>
          </Link>
          
          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/game/${room.toLowerCase()}`}>
            <Button colorScheme="teal" mt={5} w={304}>Join Game</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}