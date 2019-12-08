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

//models and db

const Batch = require("./batch/model");
const Student = require("./student/model");
const Evaluation = require("./evaluation/model");
const db = require("./db");

//init
const app = express();
const port = process.env.PORT || 4000;
db.sync({ force: true })
  .then(() => {
    console.log("Database connected");
    const batchNumbers = [1, 2, 3, 4, 5, 6];
    const batches = batchNumbers.map(batchNumber =>
      Batch.create({ batchNumber: batchNumber })
    );
    return Promise.all(batches);
  })
  .then(() => {
    const students = [
      {
        name: "Ned Stark",
        batchId: 1,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Ned_Stark-Sean_Bean.jpg/220px-Ned_Stark-Sean_Bean.jpg"
      },
      {
        name: "Jaime Lannister",
        batchId: 2,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Jaime_Lannister-Nikolaj_Coster-Waldau.jpg/220px-Jaime_Lannister-Nikolaj_Coster-Waldau.jpg"
      },
      {
        name: "Cersei Lannister",
        batchId: 3,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Cersei_Lannister_in_Black_Dress_in_Season_5.jpg/220px-Cersei_Lannister_in_Black_Dress_in_Season_5.jpg"
      },
      {
        name: "Daenerys Targaryen",
        batchId: 4,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg/220px-Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg"
      },
      {
        name: "Jorah Mormont",
        batchId: 1,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Jorah_Mormont-Iain_Glen.jpg/220px-Jorah_Mormont-Iain_Glen.jpg"
      },
      {
        name: "Jon Snow",
        batchId: 2,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Jon_Snow_Season_8.png/220px-Jon_Snow_Season_8.png"
      },
      {
        name: "Sansa Stark",
        batchId: 3,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/SophieTurnerasSansaStark.jpg/220px-SophieTurnerasSansaStark.jpg"
      },
      {
        name: "Arya Stark",
        batchId: 4,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Arya_Stark-Maisie_Williams.jpg/220px-Arya_Stark-Maisie_Williams.jpg"
      },
      {
        name: "Theon Greyjoy",
        batchId: 1,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Theon_Greyjoy-Alfie_Allen.jpg/220px-Theon_Greyjoy-Alfie_Allen.jpg"
      },
      {
        name: "Bran Stark",
        batchId: 2,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Bran_Stark_-_Isaac_Hempstead-Wright.jpeg/220px-Bran_Stark_-_Isaac_Hempstead-Wright.jpeg"
      },
      {
        name: "Joffrey Baratheon",
        batchId: 3,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Joffrey_Baratheon-Jack_Gleeson.jpg/220px-Joffrey_Baratheon-Jack_Gleeson.jpg"
      },
      {
        name: "Davos Seaworth",
        batchId: 4,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Davos_Seaworth_Sitting_Liam_Cunningham.jpg/220px-Davos_Seaworth_Sitting_Liam_Cunningham.jpg"
      },
      {
        name: "Tyrion Lannister",
        batchId: 1,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Tyrion_Lannister-Peter_Dinklage.jpg/220px-Tyrion_Lannister-Peter_Dinklage.jpg"
      },
      {
        name: "LittleFinger",
        batchId: 2,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Aidan_Gillen_playing_Petyr_Baelish.jpg/220px-Aidan_Gillen_playing_Petyr_Baelish.jpg"
      },
      {
        name: "Sam",
        batchId: 3,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Samwell_Tarly-John_Bradley.jpg/220px-Samwell_Tarly-John_Bradley.jpg"
      },
      {
        name: "Varys",
        batchId: 4,
        photo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Varys-Conleth_Hill.jpg/220px-Varys-Conleth_Hill.jpg"
      }
    ];

    const studentPromises = students.map(student => Student.create(student));
    return Promise.all(studentPromises);
  })
  .then(() => {
    // const evaluations = [
    //   { studentId: 1, batchId: 1, date: "20-10-2019", color: "green" },
    //   { studentId: 1, batchId: 1, date: "27-10-2019", color: "green" },
    //   { studentId: 2, batchId: 2, date: "20-10-2019", color: "yellow" },
    //   { studentId: 2, batchId: 2, date: "27-10-2019", color: "red" },
    //   { studentId: 3, batchId: 1, date: "20-10-2019", color: "green" },
    //   { studentId: 3, batchId: 1, date: "27-10-2019", color: "yellow" },
    //   { studentId: 4, batchId: 2, date: "20-10-2019", color: "yellow" },
    //   { studentId: 4, batchId: 2, date: "20-10-2019", color: "yellow" },
    //   { studentId: 4, batchId: 2, date: "27-10-2019", color: "yellow" },
    //   { studentId: 5, batchId: 2, date: "20-10-2019", color: "green" },
    //   { studentId: 5, batchId: 2, date: "27-10-2019", color: "yellow" },
    //   { studentId: 6, batchId: 2, date: "20-10-2019", color: "green" },
    //   { studentId: 6, batchId: 2, date: "27-10-2019", color: "green" },
    //   { studentId: 7, batchId: 1, date: "20-10-2019", color: "red" },
    //   { studentId: 7, batchId: 1, date: "27-10-2019", color: "green" }
    // ];
    // const evaluationPromises = evaluations.map(evaluation =>
    //   Evaluation.create(evaluation)
    // );
    // return Promise.all(evaluationPromises);
  })
  .catch(console.error);
app
  .use(corsMiddleWare)
  .use(bodyParserMiddleWare)
  .use(userRouter)
  .use(authRouter)
  .use(batchRouter)
  .use(studentRouter)
  .use(evaluationRouter)
  .listen(port, () => console.log("Server runing on port: ", port));
