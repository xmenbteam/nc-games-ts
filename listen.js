const app = require("./dist/app");

const { PORT = 9090 } = process.env;
// console.log(app.default);

app.default.listen(PORT, () => console.log(`Listening on ${PORT}...`));
