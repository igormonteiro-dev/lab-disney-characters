/**
 *  Your code ⬇️
 */

const express = require("express");
const app = express();

// Importing the file.json
const disneyCharacters = require("./disney.json");

// Listen to a port
app.listen(3000);

app.use(express.json());

//app.get("/characters", function (req, res) {
//res.json(disneyCharacters);
//});

app.get("/characters", (req, res) => {
  const name = req.query.name;
  const film = req.query.films;
  let result = [];

  if (name) {
    const temp = disneyCharacters.filter((oneCharacter) => {
      return oneCharacter.name.includes(name);
    });
    result.push(temp);
  }
  if (film) {
    const sameFilm = disneyCharacters.filter((oneCharacter) => {
      return oneCharacter.films.includes(film);
    });
    result.push(sameFilm);
  }
  res.json(result);
});

// Have to use : before _id
app.get("/characters/:_id", (req, res) => {
  const { _id } = req.params;
  const characterById = disneyCharacters.find((characters) => {
    return characters._id === Number(_id);
  });
  if (characterById) {
    res.json(characterById);
  } else {
    res.json({ message: "No character found!" });
  }
});

//create some characters
app.post("/characters", (req, res) => {
  const { name, films } = req.body;
  const _id = disneyCharacters.length + 1;
  const characterToCreate = {
    name,
    films,
    _id,
  };

  disneyCharacters.push(characterToCreate);
  res.json(characterToCreate);
});

// app.get("/characters", (req, res) => {
//   const film = req.query.film;

//   let result = [...characters];

//   if (film) {
//     let result = disneyCharacters.filter((film) => {
//       return film.includes(disneyCharacters.name);
//     });
//   }
// });
