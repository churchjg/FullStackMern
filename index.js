const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");

// const foodInfo = require('../models/foodinfo');
app.use(cors());
app.use(parser.json());


//test
