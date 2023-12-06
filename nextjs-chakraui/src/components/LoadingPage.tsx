"use client"
import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingPage() {
    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
            <Spinner 
                thickness="8px"
                size={"xl"}
            />
        </Flex>
    )
}