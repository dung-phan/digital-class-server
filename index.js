const express = require("express");

//midlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const bodyParserMiddleWare = bodyParser.json();
const corsMiddleWare = cors();

//router
const batchRouter = require("./batch/router");
const studentRouter = require("./student/router");
const evaluationRouter = require("./evaluation/router");
const userRouter = require("./user/router");
const authRouter = require("./auth/router");

//db
const db = require("./db");

//init
const app = express();
const port = process.env.PORT || 4000;
db.sync().catch(console.error);
app
  .use(corsMiddleWare)
  .use(bodyParserMiddleWare)
  .use(userRouter)
  .use(authRouter)
  .use(batchRouter)
  .use(studentRouter)
  .use(evaluationRouter)
  .listen(port, () => console.log("Server runing on port: ", port));
