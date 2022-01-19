const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
import db from "../../connection.js";

const runSeed = async () => {
  await seed(devData);
  await db.end();
};

runSeed();
