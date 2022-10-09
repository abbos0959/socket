import {
   Avatar,
   Button,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Text,
   Tooltip,
   useToast,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/hooks";
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   Input,
   DrawerCloseButton,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/Chatprovider";
import { ProfileModal } from "./ProfileModal";
import { useHistory } from "react-router-dom";
export const SideDrawer = () => {
   const history = useHistory();
   const [search, setSearch] = useState("");
   const [searchResult, setsearchResult] = useState([]);
   const [loading, setloading] = useState(false);
   const [loadingchat, setloadingchat] = useState();

   const { user } = ChatState();
   console.log(user, "salom usercha");

   const logoutHandler = () => {
      localStorage.removeItem("userInfo");

      history.push("/");
   };
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();

   const handleSearch = () => {
      if (!search) {
         toast({
            title: "siz qidirish uchun ma`lumot kiritmadingzi",
            status: "warning",
            duration: 5000,
            position: "top-left",
            isClosable: true,
         });
      }
   };
   return (
      <>
         <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            width="100%"
            padding="5px 10px 5px 10px"
            borderWidth="5px"
         >
            <Tooltip label="Search" hasArrow placement="bottom-end">
               <Button variant="ghost" onClick={onOpen}>
                  <i className="fas fa-search" />
                  <Text display={{ base: "none", md: "flex" }} px="4">
                     Foydalanuvchi Qidirish
                  </Text>
               </Button>
            </Tooltip>

            <Text fontSize="2xl" fontFamily="work sans">
               Abbos Chat
            </Text>
            <div>
               <Menu>
                  <MenuButton p={1}>
                     <BellIcon fontSize="2xl" m={1} />
                  </MenuButton>
               </Menu>
               <Menu>
                  <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
                     <Avatar
                        size="sm"
                        cursor="pointer"
                        src={user.data.user.name}
                        name={user.data.user.name}
                     />
                  </MenuButton>

                  <MenuList>
                     <ProfileModal user={user}>
                        <MenuItem>Profil</MenuItem>
                     </ProfileModal>
                     <MenuDivider />
                     <MenuItem onClick={logoutHandler}>Chiqish</MenuItem>
                  </MenuList>
               </Menu>
            </div>
         </Box>

         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Create your account</DrawerHeader>
               <DrawerBody>
                  <Box display="flex" pb={2}>
                     <Input
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Type here..."
                     />
                     <Button onClick={handleSearch} colorScheme="blue">
                        Go
                     </Button>
                  </Box>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};
