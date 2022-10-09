import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { SideDrawer } from "../components/SideDrawer";
import { ChatState } from "../context/Chatprovider";
import { useHistory } from "react-router-dom";
import { Mychats } from "../components/Mychats";
import { ChatsBox } from "../components/chatsBox";
export const ChatPage = () => {
   const history = useHistory();
   const { user } = ChatState();

   console.log("sas", user);
   return (
      <div style={{ width: "100%" }}>
         {user && <SideDrawer />}

         <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh">
            {user && <ChatsBox />}
            {user && <Mychats />}
         </Box>
      </div>
   );
};
