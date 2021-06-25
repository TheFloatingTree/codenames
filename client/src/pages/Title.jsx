// @ts-nocheck
import React, { useState } from 'react'
import { Button, Flex, Heading, Input, Spacer, useColorMode, useColorModeValue } from "@chakra-ui/react"
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
          <span style={{fontSize: "14px"}}>Screen Name</span>
          <Input placeholder="Screen Name" borderColor="gray.500" varient="filled" mb={2} type="text" onChange={(event) => setName(event.target.value)}/>
          <span style={{fontSize: "14px"}}>Room Name</span>
          <Input placeholder="Room Name" borderColor="gray.500" varient="filled" mb={2} type="text" onChange={(event) => setRoom(event.target.value)}/>
          <span style={{fontSize: "14px"}}>Password</span>
          <Input placeholder="Password" borderColor="gray.500" varient="filled" mb={2} type="text" onChange={(event) => setPassword(event.target.value)}/>

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