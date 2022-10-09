// import { Children, createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const ChatContext = createContext();

// const Chatprovider = ({ Children }) => {
//    const history = useHistory();
//    const [user, setUser] = useState();

//    useEffect(() => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       setUser(userInfo);
//       if (!userInfo) {
//         //  console.log("salom");
//           history.push("/");
//       }
//    }, [history]);
//    return <ChatContext.Provider value={{ user, setUser }}>{Children}</ChatContext.Provider>;
// };

// export const chatState = () => {
//    return useContext(ChatContext);
// };

// export default Chatprovider;

import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
   const [selectedChat, setSelectedChat] = useState();
   const [user, setUser] = useState();
   const [notification, setNotification] = useState([]);
   const [chats, setChats] = useState();

   const history = useHistory();

   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

      // if (!userInfo) null
   }, [history]);

   return (
      <ChatContext.Provider
         value={{
            user,
            setUser,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};

export const ChatState = () => {
   return useContext(ChatContext);
};

export default ChatProvider;
