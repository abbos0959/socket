import {
   VStack,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [show, setShow] = useState(false);

   const handeShow = () => {
      setShow(!show);
   };
   const submitHandler = () => {};

   return (
      <VStack spacing="5px">
         <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Emailgizni Kiriting"
            />
         </FormControl>
         <FormControl id="password" isRequired>
            <FormLabel>Parol</FormLabel>
            <InputGroup>
               <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolgizni Kiriting"
               />
               <InputRightElement>
                  <Button h="1.75rem" size="sm" onClick={handeShow}>
                     {show ? "hide" : "show"}
                  </Button>
               </InputRightElement>
            </InputGroup>
         </FormControl>

         <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
            Login
         </Button>
         <Button
            variant={"solid"}
            colorScheme="red"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={() => {
               setEmail("guest@example.com");
               setPassword("123456");
            }}
         >
            Get Guest
         </Button>
      </VStack>
   );
};
