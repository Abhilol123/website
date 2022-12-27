const express = require("express");
const app = express();

const NODEJS_PORT = process.env.NODEJS_PORT || 3000;

app.listen(NODEJS_PORT, () => {
	console.log(`listening at https://localhost:${NODEJS_PORT}`);
});

app.use(express.static("public"));

/**
run the following command in the command line and forget:

nohup node index.js &
disown
 */
