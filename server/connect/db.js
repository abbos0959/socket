const mongoose = require("mongoose");

const DB = async () => {
   try {
      await mongoose.connect(process.env.URL);
      console.log("mongodb ulandi".green.bold.underline);
   } catch (error) {
      console.log("mongodb ulanmadi".red.bold.underline);
   }
};

module.exports = DB;
