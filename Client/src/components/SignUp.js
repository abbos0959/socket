import React, { useState } from "react";
import {
   VStack,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { useHistory } from "react-router-dom";
export const SignUp = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [show, setShow] = useState(false);
   const [pic, setPic] = useState();

   const [loading, setLoading] = useState(false);
   const toast = useToast();
   const history = useHistory();

   const handeShow = () => {
      setShow(!show);
   };

   const Postdetails = (pics) => {
      setLoading(true);
      if (pics == undefined) {
         toast({
            title: "Please select image",
            description: "We've created your account for you.",
            status: "warning",
            duration: 5000,
            isClosable: true,
         });
         return;
      }
      if (pics.type == "image/jpeg" || pics.type == "image/jpg" || pics.type == "image/png") {
         const data = new FormData();
         data.append("file", pics);
         data.append("cloud_name", "abbos");
         data.append("upload_preset", "abboschat");
         fetch("https://api.cloudinary.com/v1_1/abbos/image/upload", {
            method: "post",
            body: data,
         })
            .then((res) => res.json())
            .then((data) => {
               setPic(data.url.toString());
               console.log(data);
               setLoading(false);
            })
            .catch((err) => {
               console.log(err);
               setLoading(false);
            });
      } else {
         toast({
            title: "Please select image",
            // description: "We've created your account for you.",
            status: "warning",
            duration: 5000,
            isClosable: true,
         });
         return;
      }
   };

   const submitHandler = async () => {
      setLoading(true);

      if (!name || !email || !password || !confirmPassword) {
         toast({
            title: "hamma ma`lumotlarni kiritmadingiz",
            // description: "We've created your account for you.",
            status: "warning",
            duration: 5000,
            isClosable: true,
         });
         setLoading(false);
         return;
      }

      if (password !== confirmPassword) {
         toast({
            title: "parollar bir hil emas",
            // description: "We've created your account for you.",
            status: "warning",
            duration: 5000,
            isClosable: true,
         });
         return;
      }

      console.log(name, email, password, pic);
      try {
         const config = {
            headers: {
               "Content-type": "application/json",
            },
         };

         const data = await axios.post(
            "http://localhost:4000/api/user/signup",
            { name, email, password, pic },
            // config
         );
         console.log(data, "bi dayayayyaaa");
         toast({
            title: "Siz ro`yhatdan o`tdingiz",
            description: "We've created your account for you.",
            status: "warning",
            duration: 5000,
            isClosable: true,
         });
         console.log(data);

         localStorage.setItem("userInfo", JSON.stringify(data));
         setLoading(false);
         history.push("/chats");
      } catch (error) {
         toast({
            title: "Xatolik",
            description: error.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
            // position: bottom,
         });
         setLoading(false);
      }
   };
   return (
      <VStack spacing="5px">
         <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Ismingizni Kiriting"
            />
         </FormControl>
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
         <FormControl id="password" isRequired>
            <FormLabel>Parol Tasdiqlash</FormLabel>
            <InputGroup>
               <Input
                  type={show ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Paroligizni tasdiqlang"
               />
               <InputRightElement>
                  <Button h="1.75rem" size="sm" onClick={handeShow}>
                     {show ? "hide" : "show"}
                  </Button>
               </InputRightElement>
            </InputGroup>
         </FormControl>

         <FormControl id="pic" isRequired>
            <FormLabel>File</FormLabel>
            <Input
               type="file"
               p={1.5}
               accept="/image*"
               onChange={(e) => Postdetails(e.target.files[0])}
               placeholder="Emailgizni Kiriting"
            />
         </FormControl>
         <Button
            isLoading={loading}
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
         >
            Sign Up
         </Button>
      </VStack>
   );
};
