
require('dotenv').config();
const initDB = require("./src/config/innitDB.js")
const port = process.env.PORT
const express = require("express");
const cors = require("cors");
const initPaymentRoutes = require("./src/routers/routerPayment.js");
const initUserRoutes = require("./src/routers/routerUser.js");
const initProductRoutes = require("./src/routers/routerProduct.js");
const initOrderRoutes = require("./src/routers/routerOrder.js");
const app = express();
const corsReact = require ("./src/config/cors")
const cookieParser = require('cookie-parser')
app.use(cors(corsReact));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
initPaymentRoutes(app);
initUserRoutes(app);
initProductRoutes(app);
initOrderRoutes(app);

(async ()=>{
    await initDB()
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
})();
