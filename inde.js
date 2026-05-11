const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

