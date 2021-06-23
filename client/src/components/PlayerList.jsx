import React from 'react'
import { Box, Button, Center, Flex, Grid, Spacer, useColorMode, Text, Switch, useColorModeValue, VStack, Divider } from "@chakra-ui/react"

export default function PlayerList({ redplayers, blueplayers, redColor, blueColor, greyColor} ) {

    return (
        <Box display="flex" justifyContent="center" >
        <Center>
            <Box w="350px" minH="400px" bgColor={greyColor} borderRadius="10" flexGrow="inherit">
                <Grid templateColumns="repeat(2, 1fr)" mt="15px" mb="15px">
                    <Flex justifyContent="center">
                        <VStack spacing="10px">
                            <Text as="b" fontSize="20px" textColor={redColor}> Red Team</Text>                                        
                            {redplayers.map((player) => {
                                return <Text fontSize="18px" textColor={redColor}>{player}</Text>
                            })}
                        </VStack>
                    </Flex>
                    <Flex justifyContent="center">
                        <VStack spacing="10px">
                            <Text as="b" fontSize="20px" textColor={blueColor}>Blue Team</Text>                                        
                            {blueplayers.map((player) => {
                                return <Text fontSize="18px" textColor={blueColor}>{player}</Text>
                            })}
                        </VStack>
                    </Flex>
                </Grid>
            </Box>
        </Center>
    </Box>
    )
}
