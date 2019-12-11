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
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F46%2Fdc%2F52%2F46dc527a545ce51e4101d5825771f630.jpg&f=1&nofb=1"
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
    const evaluations = [
      [
        {
          date: "2019-12-07",
          color: "green",
          remark: "Clean code, able to finish required tasks",
          studentId: 1,
          batchId: 1
        },
        {
          date: "2019-12-26",
          color: "yellow",
          remark: "Need to try more",
          studentId: 1,
          batchId: 1
        },
        {
          date: "2019-12-07",
          color: "red",
          remark: "Failed to run basic tasks",
          studentId: 5,
          batchId: 1
        },
        {
          date: "2019-12-22",
          color: "yellow",
          remark: "Need to try more",
          studentId: 8,
          batchId: 1
        },
        {
          date: "2019-12-26",
          color: "green",
          remark: "Very good",
          studentId: 12,
          batchId: 1
        },
        {
          date: "2020-01-02",
          color: "yellow",
          remark: "Need to try more",
          studentId: 5,
          batchId: 1
        },
        {
          date: "2019-12-02",
          color: "yellow",
          remark: "Need to try more",
          studentId: 5,
          batchId: 1
        },
        {
          date: "2019-12-20",
          color: "red",
          remark: "Failed to run basic tasks",
          studentId: 8,
          batchId: 1
        },
        {
          date: "2019-12-12",
          color: "yellow",
          remark: "Need to try more",
          studentId: 8,
          batchId: 1
        },
        {
          date: "2019-12-12",
          color: "green",
          remark: "Excellent!",
          studentId: 12,
          batchId: 1
        },
        {
          date: "2019-12-01",
          color: "red",
          remark: "Failed to run basic tasks",
          studentId: 8,
          batchId: 1
        },
        {
          date: "2019-12-31",
          color: "red",
          remark: "Failed to run basic tasks",
          studentId: 8,
          batchId: 1
        },
        {
          date: "2019-12-19",
          color: "yellow",
          remark: "Need to try more",
          studentId: 2,
          batchId: 2
        },
        {
          date: "2019-12-11",
          color: "green",
          remark: "Excellent!",
          studentId: 7,
          batchId: 2
        },
        {
          date: "2019-12-15",
          color: "yellow",
          remark: "Not sure",
          studentId: 9,
          batchId: 2
        },
        {
          date: "2019-12-19",
          color: "green",
          remark: "He knows what he's doing!",
          studentId: 13,
          batchId: 2
        },
        {
          date: "2019-12-21",
          color: "red",
          remark: "Failed to run basic tasks",
          studentId: 2,
          batchId: 2
        },
        {
          date: "2019-12-06",
          color: "green",
          remark: "Excellent!",
          studentId: 3,
          batchId: 3
        },
        {
          date: "2019-12-13",
          color: "green",
          remark: "Very good",
          studentId: 6,
          batchId: 3
        },
        {
          date: "2019-12-21",
          color: "yellow",
          remark: "Need to try more",
          studentId: 14,
          batchId: 3
        },
        {
          date: "2019-12-18",
          color: "red",
          remark: "Dead!",
          studentId: 15,
          batchId: 3
        },
        {
          date: "2019-12-27",
          color: "green",
          remark: "Very good",
          studentId: 4,
          batchId: 4
        },
        {
          date: "2019-12-14",
          color: "green",
          remark: "Excellent!",
          studentId: 10,
          batchId: 4
        },
        {
          date: "2019-12-15",
          color: "red",
          remark: "Need to try more",
          studentId: 11,
          batchId: 4
        },
        {
          date: "2019-12-07",
          color: "yellow",
          remark: "Need to try more",
          studentId: 16,
          batchId: 4
        }
      ]
    ];
    const evaluationPromises = evaluations.map(evaluation =>
      Evaluation.create(evaluation)
    );
    return Promise.all(evaluationPromises);
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
