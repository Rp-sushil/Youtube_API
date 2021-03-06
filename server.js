const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const search = require("./search/index");
const port = 5000;

dotenv.config();
//connect to DB
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to MongoDB.....");
  }
);

var apiKeyIdx = 0;

// start listening..
app.listen(port, () => {
  console.log(`Server running......${port}`);
  setInterval(() => {
    if (search("official", "2018-01-01T00:00:00Z", apiKeyIdx)) {
      apiKeyIdx++;
    } // parameter: query string, publishedAfter, apiKeyIdx -> which api key should be used
  }, 10000);
});
