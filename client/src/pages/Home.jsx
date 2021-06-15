import React from 'react'
import { Button, Center, Flex, Grid, Spacer, useColorMode } from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import GameTile from '../components/GameTile'

export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode()

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
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                    <GameTile></GameTile>
                </Grid>
            </Center>
        </>
    )
}
