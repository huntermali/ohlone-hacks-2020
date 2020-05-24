// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("views"));
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      //Creates Badges table to keep track of which badges have been earned
      "CREATE TABLE Badges (id INTEGER PRIMARY KEY AUTOINCREMENT, badge1 INTEGER, badge2 INTEGER, badge3 INTEGER, badge4 INTEGER, badge5 INTEGER, badge6 INTEGER, badge7 INTEGER, badge8 INTEGER, badge9 INTEGER, badge10 INTEGER)"
    );
    console.log("New table Badges created!");
    db.run(
      "CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, pass TEXT NOT NULL, picURL TEXT NOT NULL)"
    );
    console.log("New table Users created!");
    db.run(
      //Keeps track of progress to determine which badges have been earned
      "CREATE TABLE Progress (id INTEGER PRIMARY KEY AUTOINCREMENT, brush INTEGER, veggies INTEGER, fruits INTEGER, walk INTEGER, jacks INTEGER, water INTEGER, allProg INTEGER)"
    );
    console.log("New table Progress created!");

    db.serialize(() => {});
  } else {
    db.each("SELECT * from Users", (err, row) => {
      if (row) {
        console.log("record: ${row.username}");
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the badges in the database
app.get("/getBadges", (request, response) => {
  db.all("SELECT * from Badges", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to get all the users in the database
app.get("/getUsers", (request, response) => {
  db.all("SELECT * from Users", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to add a badge to the database
app.post("/addBadges", (request, response) => {
  console.log("add to badges ${request.body.badge}");

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.run(
      "INSERT INTO Badges (badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8, badge9, badge10) VALUES (?,?,?,?,?,?,?,?,?,?)",
      request.body.badge1,
      request.body.badge2,
      request.body.badge3,
      request.body.badge4,
      request.body.badge5,
      request.body.badge6,
      request.body.badge7,
      request.body.badge8,
      request.body.badge9,
      request.body.badge10,
      error => {
        if (error) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

// endpoint to add a user to the database
app.post("/addUsers", (request, response) => {
  console.log(request.body.username);
  console.log(
    `add to users ${request.body.username},  ${request.body.pass},  ${request.body.picURL}`
  );

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.run(
      "INSERT INTO Users (username, pass, picURL) VALUES (?,?,?)",
      request.body.username,
      request.body.pass,
      request.body.picURL,
      error => {
        if (error) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

// endpoint to add a progress entry to the database
app.post("/addProgress", (request, response) => {
  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  console.log("Progress added");
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.run(
      "INSERT INTO Progress (brush, veggies, fruits, walk, jacks, water, allProg) VALUES (?,?,?,?,?,?,?)",
      request.body.brush,
      request.body.veggies,
      request.body.fruits,
      request.body.walk,
      request.body.jacks,
      request.body.water,
      request.body.allProg,
      error => {
        if (error) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

// endpoint to get all the progress to the database
app.get("/getProgress", (request, response) => {
  db.all("SELECT * from Progress", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to update a progress entry to the database
app.get("/updateProgress", (request, response) => {
  if (!process.env.DISALLOW_WRITE) {
    db.run(
      "UPDATE Progress SET brush=?, veggies=?, fruits=?, walk=?, jacks=?, water=?, allProg=? WHERE id=?",
      request.body.brush,
      request.body.veggies,
      request.body.fruits,
      request.body.walk,
      request.body.jacks,
      request.body.water,
      request.body.allProg,
      request.body.id,
      error => {
        if (error) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

