
require('dotenv').config();
const initDB = require("./src/config/innitDB.js")
const port = process.env.PORT
const express = require("express");
const cors = require("cors");
const initApiRoutes = require("./src/routers/api");
const app = express();
const corsReact = require ("./src/config/cors")
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

initApiRoutes(app);
(async ()=>{
    await initDB()
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
})();
