"use client"

import { Box, Button, Icon, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";


export default function DarkModeButton() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box position={"fixed"} bottom={4} right={4}>
            <Box as={Button} variant={"link"} onClick={toggleColorMode} bg={colorMode === 'light' ? 'black' : 'gray'} rounded={"full"} p={2}>
                {colorMode === 'light'
                    ? <Icon as={SunIcon} h={6} w={6} color={"yellow"} />
                    : <Icon as={MoonIcon} h={6} w={6} color={"black"} />
                }
            </Box>
        </Box>
    )
}