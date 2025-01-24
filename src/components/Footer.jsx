"use strict";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={4}
     
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Text>&copy; {new Date().getFullYear()} My Website</Text>
        <Flex gap={4}>
          <Link href="#" color="white">
            Privacy Policy
          </Link>
          <Link href="#"  color="white">
            Terms of Service
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
