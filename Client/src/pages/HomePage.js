import React from "react";
import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";

export const HomePage = () => {
   return (
      <Container maxW="xl" centerContent>
         <Box
            display="flex"
            justifyContent="center"
            p={3}
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
         >
            <Text fontSize="4xl" fontFamily="work sans" color="black">
               Ro`yhatdan O`tish
            </Text>
         </Box>
         <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs variant="soft-rounded">
               <TabList mb="1rem">
                  <Tab width="50%">Login</Tab>
                  <Tab width="50%">Sign Up</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>
                     <Login />
                  </TabPanel>
                  <TabPanel>
                     <SignUp />
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </Box>
      </Container>
   );
};
