const app = require("./dist/app");

const { PORT = 9090 } = process.env;

app.default.listen(PORT, () => console.log(`Listening on ${PORT}...`));
