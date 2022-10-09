const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");
const chatModel = require("../model/chatModel");
const UserModel = require("../model/userModel");
const accesChat = catchErrorAsync(async (req, res, next) => {
   const { userId } = req.body;
   if (!userId) {
      return next(new AppError("userId topilmadi", 400));
   }

   let ischat = await chatModel
      .find({
         isGroupChat: false,
         $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
         ],
      })
      .populate("users")
      .populate("latestMessage");

   ischat = await UserModel.populate(ischat, {
      path: "latestMessage.sender",
      select: "name pic email",
   });

   if (ischat.length > 0) {
      res.send(ischat[0]);
   } else {
      let chatData = {
         chatName: "sender",
         isGroupChat: false,
         users: [req.user._id, userId],
      };

      try {
         const createChat = await chatModel.create(chatData);

         const Fullchat = await chatModel.findOne({ _id: createChat._id }).populate("users");
         res.status(200).send(Fullchat);
      } catch (error) {
         res.status(400).json({
            message: error.message,
         });
      }
   }
});

const fetchChats = catchErrorAsync(async (req, res, next) => {
   try {
      await chatModel
         .find({ users: { $elemMatch: { $eq: req.user._id } } })
         .populate("users", "-password")
         .populate("groupAdmin", "-password")
         .populate("latestMessage")
         .sort({ updatedAt: -1 })
         .then(async (result) => {
            result = await UserModel.populate(result, {
               path: "latestMessage.sender",
               select: "name pic email",
            });
            res.status(200).send(result);
         });
   } catch (error) {
      res.status(400).json({
         message: error.message,
      });
   }
});

const createGroupChat = catchErrorAsync(async (req, res, next) => {
   if (!req.body.users || !req.body.name) {
      return next(new AppError("hamma ma`lumotlar kiritilishi shart", 404));
   }

   let users = JSON.parse(req.body.users);

   if (users.length < 2) {
      return next(new AppError("guruh ochish uchun kamida 2 ta  user bo`lishi kerak", 404));
   }
   users.push(req.user);

   try {
      const groupchat = await chatModel.create({
         chatName: req.body.name,
         users: users,
         isGroupChat: true,
         groupAdmin: req.user,
      });

      const FullChat = await chatModel
         .findOne({ _id: groupchat._id })
         .populate("users", "-password")
         .populate("groupAdmin", "-password");

      res.status(200).send(FullChat);
   } catch (error) {
      res.status(404).json({
         msessage: error.message,
      });
   }
});

const renameGroup = catchErrorAsync(async (req, res, next) => {
   const { chatId, chatName } = req.body;
   const updateChat = await chatModel
      .findByIdAndUpdate(chatId, { chatName }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   if (!updateChat) {
      return next(new AppError("bunday guruh mavjud emas", 404));
   } else {
      res.status(200).json(updateChat);
   }
});

const addUserChat = catchErrorAsync(async (req, res, next) => {
   const { chatId, userId } = req.body;

   // const check = await chatModel.findById(chatId, { users: userId });
   // if (check) {
   //    return next(new AppError("bunday user chatda mavjud"));
   // }

   const added = await chatModel
      .findByIdAndUpdate(
         chatId,
         {
            $push: { users: userId },
         },
         { new: true }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   if (!added) {
      return next(new AppError("bunday guruh mavjud emas", 404));
   } else {
      res.status(200).json(added);
   }
});

const removeUserChat = catchErrorAsync(async (req, res, next) => {
   const { chatId, userId } = req.body;

   const removechatuser = await chatModel
      .findByIdAndUpdate(
         chatId,
         {
            $pull: { users: userId },
         },
         { new: true }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   if (!removechatuser) {
      return next(new AppError("bunday chat mavjud emas"));
   } else {
      res.status(200).json(removechatuser);
   }
});

module.exports = {
   accesChat,
   fetchChats,
   createGroupChat,
   renameGroup,
   addUserChat,
   removeUserChat,
};
