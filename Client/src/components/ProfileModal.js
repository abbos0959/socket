import { ViewIcon } from "@chakra-ui/icons";
import { Button, IconButton, Image } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";

export const ProfileModal = ({ user, children }) => {
   const { isOpen, onClose, onOpen } = useDisclosure();
   return (
      <div>
         {children ? (
            <span onClick={onOpen}> {children}</span>
         ) : (
            <IconButton display={{ base: "flex" }} icon={<ViewIcon onClick={onOpen} />} />
         )}

         <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader
                  fontSize="40px"
                  fontFamily="work sans"
                  display="flex"
                  justifyContent="center"
               >
                  {user.data.user.name}
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Image
                     borderRadius="full"
                     boxSize="150px"
                     
                     src={user.data.user.pic}
                     alt={user.data.user.name}
                  />
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </div>
   );
};
