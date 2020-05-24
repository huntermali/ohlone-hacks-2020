// client-side js
// run by the browser each time your view template referencing it is loaded

//if on the badges page, display all earned badges
if (document.URL.includes("badges-page.html")) {
  var badges_lst = window.localStorage.getItem("badges");

  //displays all badges with a value of "1" for True
  for (var i = 0; i < badges_lst.length; i++) {
    if (badges_lst[i] == "1") {
      document.getElementById("badge" + (i + 1).toString()).src =
        "badge" + (i + 1).toString() + ".jpg";
    }
  }
  //if on the log-in page
} else if (document.URL.includes("log-in.html")) {
  //creates all of the arrays needed to keep track of who is online
  const usernames = [];
  const passwords = [];
  const picURLs = [];
  const badges = [];
  const progress = [];
  const ids = [];

  //gets data from the inputs and finds the submit button
  const userForm = document.getElementById("login-submit");
  const usernameInput = document.getElementById("l-user");
  const passInput = document.getElementById("l-pass");
  
  //runs the getUsers from server.js to get all the users in the database
  fetch("/getUsers", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        //appends all the users to the different arrays
        appendUsers(row.id, row.username, row.pass, row.picURL);
      });
    });
  
  //runs the getBadges from server.js to get all the badges in the database
  fetch("/getBadges", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        //creates a json object from badges and creates a variable to hold it
        appendBadges(
          row.badge1,
          row.badge2,
          row.badge3,
          row.badge4,
          row.badge5,
          row.badge6,
          row.badge7,
          row.badge8,
          row.badge9,
          row.badge10
        );
      });
    });

  //runs getProgress from server.js to get all the progress entries from the database
  fetch("/getProgress", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        //creates a json object from the progress entries and creates a variable to hold it
        appendProgress(
          row.brush,
          row.veggies,
          row.fruits,
          row.walk,
          row.jacks,
          row.water,
          row.allProg
        );
      });
    });
  
  //takes in all of the progress entries from one row
  const appendProgress = (
    brusha,
    veggiesa,
    fruitsa,
    walka,
    jacksa,
    watera,
    allProga
  ) => {
    //creates a json object
    var progress_lst = {
      brush: brusha,
      veggies: veggiesa,
      fruits: fruitsa,
      walk: walka,
      jacks: jacksa,
      water: watera,
      allProg: allProga
    };
    //pushes the json object into the array
    badges.push(JSON.stringify(progress_lst));
  };
  
  //pushes user data into arrays
  const appendUsers = (id, username, pass, picURL) => {
    ids.push(id);
    usernames.push(username);
    passwords.push(pass);
    picURLs.push(picURL);
  };

  //a row entry of Badges
  const appendBadges = (
    badge1a,
    badge2a,
    badge3a,
    badge4a,
    badge5a,
    badge6a,
    badge7a,
    badge8a,
    badge9a,
    badge10a
  ) => {
    //creates a json object
    var badge_lst = {
      badge1: badge1a,
      badge2: badge2a,
      badge3: badge3a,
      badge4: badge4a,
      badge5: badge5a,
      badge6: badge6a,
      badge7: badge7a,
      badge8: badge8a,
      badge9: badge9a,
      badge10: badge10a
    };
    //pushes json object into badges array
    badges.push(JSON.stringify(badge_lst));
  };

  //when the form is clicked to submit
  userForm.onclick = event => {
    // stop our form submission from refreshing the page
    event.preventDefault();

    var i;
    for (i = 0; i < usernames.length; i++) {
      //if the username and password are correct
      if (
        usernames[i] == usernameInput.value &&
        passwords[i] == passInput.value
      ) {
        //saves a bunch of necessary data about the user locally
        window.localStorage.setItem("pfp", picURLs[i]);
        window.localStorage.setItem("name", usernames[i]);
        window.localStorage.setItem("badge_lst", badges[i]);
        window.localStorage.setItem("progress_lst", progress[i]);
        window.localStorage.setItem("id", ids[i]);
        //redirects user to
        window.location.href =
          "https://pyrite-elegant-felidae.glitch.me/child-home.html";
      }
    }
  };
} else if (document.URL.includes("child-home.html")) {
  document.getElementById("pfp_display").src = window.localStorage.getItem(
    "pfp"
  );
  document.getElementById("welcome-msg").innerHTML =
    "Welcome, " + window.localStorage.getItem("name");
  //(brush, veggies, fruits, walk, jacks, water, all)
  const userForm = document.getElementById("daily-submit");
  
  //increments progress
  var temp = window.localStorage.getItem("progress_lst");
  if (document.getElementById("brush").checked) {
    temp["brush"] += 1;
    temp["allProg"] += 1;
  }
  if (document.getElementById("veggies").checked) {
    temp["veggies"] += 1;
    temp["allProg"] += 1;
  }
  if (document.getElementById("fruits").checked) {
    temp["fruits"] += 1;
    temp["allProg"] += 1;
  }
  if (document.getElementById("walk").checked) {
    temp["walk"] += 1;
    temp["allProg"] += 1;
  }
  if (document.getElementById("brush").checked) {
    temp["jacks"] += 1;
    temp["allProg"] += 1;
  }
  if (document.getElementById("brush").checked) {
    temp["water"] += 1;
    temp["allProg"] += 1;
  }
} else {
  // define variables that reference elements on our page
  const userForm = document.getElementById("submit-user");
  const usernameInput = document.getElementById("username");
  const passInput = document.getElementById("pass");
  const typeInput = document.getElementById("type");
  var radioSec = "";

  // request the badges from our app's sqlite database
  fetch("/getUsers", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        console.log(row.username);
      });
    });

  // listen for the form to be submitted and add a new user when it is
  userForm.onclick = event => {
    // stop our form submission from refreshing the page
    event.preventDefault();

    var radios = document.getElementsByName("picURL");

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        radioSec = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    const data = {
      username: usernameInput.value,
      pass: passInput.value,
      picURL: radioSec
    };

    fetch("/addUsers", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        console.log(JSON.stringify(response));
      });
    
    //creates initial badge data
    const badge_data = {
      badge1: 0,
      badge2: 0,
      badge3: 0,
      badge4: 0,
      badge5: 0,
      badge6: 0,
      badge7: 0,
      badge8: 0,
      badge9: 0,
      badge10: 0
    };

    fetch("/addBadges", {
      method: "POST",
      body: JSON.stringify(badge_data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        console.log(JSON.stringify(response));
      });
    
    //creates initial progress data
    const progress_data = {
      brush: 0,
      veggies: 0,
      fruits: 0,
      walk: 0,
      jacks: 0,
      water: 0,
      allProg: 0
    };

    fetch("/addProgress", {
      method: "POST",
      body: JSON.stringify(progress_data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        console.log(JSON.stringify(response));
      });

    // reset form (brush, veggies, fruits, walk, jacks, water, all)

    usernameInput.value = "";
    passInput.value = "";
    typeInput.value = "";
  };
}
