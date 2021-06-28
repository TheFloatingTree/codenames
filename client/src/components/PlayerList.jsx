import React from 'react'
import { Box, Center, Flex, Grid, Text, VStack, Divider } from "@chakra-ui/react"

export default function PlayerList({ redplayers, blueplayers, redColor, blueColor, greyColor} ) {

    return (
        <Box display="flex" justifyContent="center" >
        <Center>
            <Box w="350px" minH="350px" bgColor={greyColor} rounded="lg" flexGrow="inherit" >
                <Grid templateColumns="repeat(2, 1fr)" mt="15px" mb="15px">
                    <Flex justifyContent="center">
                        <VStack spacing="10px">
                            <Text as="b" fontSize="20px" textColor={redColor}> Red Team</Text>
                            <Divider orientation="horizontal"></Divider>                                        
                            {redplayers.map((player) => {
                                return <Text fontSize="18px" key={player} textColor={redColor}>{player}</Text>
                            })}
                        </VStack>
                    </Flex>
                    <Flex justifyContent="center">
                        <VStack spacing="10px">
                            <Text as="b" fontSize="20px" textColor={blueColor}>Blue Team</Text>
                            <Divider orientation="horizontal"></Divider>                                        
                            {blueplayers.map((player) => {
                                return <Text fontSize="18px" key={player} textColor={blueColor}>{player}</Text>
                            })}
                        </VStack>
                    </Flex>
                </Grid>
            </Box>
        </Center>
    </Box>
    )
}
