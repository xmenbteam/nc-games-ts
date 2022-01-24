const app = require("./dist/app");

const { PORT = 9090 } = process.env;

app.listen(PORT);
