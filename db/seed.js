const Artist = require("../models/movieInfo");
const artists = require("./movies.json");

Artist.deleteMany({}).then(() => {
  Artist.create(artists).then((artists) => {
    console.log(artists);
    process.exit();
  });
});
