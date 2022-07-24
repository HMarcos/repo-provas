import dotenv from "dotenv";

import app from "./app.js";
import logging from "./utils/logging.js";

dotenv.config();

const PORT = +process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(logging.info(`The server is running on PORT ${5000}...`));
});