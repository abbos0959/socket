const app = require("./middleware/app");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log(`server ishladi  ${PORT}`.yellow.bold.underline);
});
